import { Entity } from './Entity'
import { getRoomPath } from '@/internal/mapLogic/engine/MapUtils.ts'
import { loadMapObjects } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'
import type { Obj } from './Obj'
import { Storage_e, Vector2, type Character, type Stats } from './types'
import { Collider } from './collision'
import { Gorg_red } from './Gorg_red'
import { prefixed } from './cryptoutils'
import { Spawner } from './spawner'
import { Ai } from './ai'
import { loadMapData } from '@/internal/mapLogic/engine/utils/BackgroundLayerUtils.ts'
import { type Router, useRouter } from 'vue-router'
import { ref, type Ref } from 'vue'

export class GameHandler {
    player: Entity
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    keys: Set<string>
    bg_image: HTMLImageElement | null
    lastTimeStamp: number
    currentRoomPath: string
    currentBackgroundRoom: any
    currentRoomObjects: Obj[]
    baseMapDim: Vector2 = new Vector2(800, 416)
    gameObjects: Obj[]
    boss: Ref<Entity | undefined>
    availableCharacters: Character[]
    currentRoom: number
    spawner: Spawner | null
    ai: Ai | null
    usedEnhancement: number
    defeatedEnemies: number
    router: Router
    health: Ref<number>
    mana: Ref<number>
    timeTaken: number
    time: number
    isGameOver: Ref<boolean> = ref(false)
    private listener: (e: KeyboardEvent) => void
    private listenerhandler: (e: KeyboardEvent) => void
    private frameId: number | null = null

    constructor(player: Entity, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.canvas = canvas
        this.availableCharacters = JSON.parse(
            localStorage.getItem(prefixed(Storage_e.CHARACTERS)) || '{[]}',
        ) as Character[]
        this.player = player
        this.keys = new Set<string>()
        this.lastTimeStamp = 0
        this.player.preloadImages()
        this.player.idle(true)
        this.gameLoop = this.gameLoop.bind(this)
        this.currentRoomPath = ''
        this.currentBackgroundRoom = {}
        this.currentRoomObjects = []
        this.bg_image = null
        this.gameObjects = []
        this.currentRoom = 1
        this.boss = ref(undefined)
        this.spawner = null
        this.ai = null
        this.usedEnhancement = 0
        this.defeatedEnemies = 0
        this.router = useRouter()
        this.timeTaken = 0
        this.time = 0
        this.health = ref<number>(this.player.health)
        this.mana = ref<number>(this.player.mana)
        this.listener = (e: KeyboardEvent) => {
            e.preventDefault()
            this.keys.add(e.key)
        }
        this.listenerhandler = (e: KeyboardEvent) => {
            e.preventDefault()
            this.keys.delete(e.key)
            if (this.keys.size === 0) this.player.idle()
        }

        window.addEventListener('keydown', this.listener)

        window.addEventListener('keyup', this.listenerhandler)
    }

    addKey(key: string) {
        this.keys.add(key)
        console.debug(key)
    }

    removeKey(key: string) {
        this.keys.delete(key)
    }

    gameLoop(timestamp: number) {
        if (this.isGameOver.value) {
            this.saveGameState()
            this.destructor()
            this.router.push('/stats')
            return
        }

        if (this.player.isDead || (this.boss && this.boss.value && this.boss.value.isDead)) {
            if (!this.isGameOver.value) this.isGameOver.value = true
            this.saveGameState()
            this.destructor()
            this.router.push('/stats')
        }

        const deltaTime = (timestamp - this.lastTimeStamp) / 1000
        this.lastTimeStamp = timestamp
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()
        if (this.bg_image)
            this.ctx.drawImage(this.bg_image, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.restore()
        Collider.update_collisions(this.gameObjects)
        this.player.handleInput(this.keys, deltaTime)
        this.player.attack(this.keys)
        this.ai?.update(deltaTime)
        this.health.value = this.player.health
        this.mana.value = this.player.mana
        this.time = performance.now() / 1000 - this.timeTaken
        this.gameObjects
            .filter((obj: Obj) => obj instanceof Entity)
            .forEach((obj: Entity) => obj.regenMana(deltaTime))
        this.gameObjects.forEach((obj: Obj) => {
            if (obj.selectedFrames == undefined) return
            obj.update(timestamp, deltaTime)
        })

        this.frameId = requestAnimationFrame(this.gameLoop)
    }

    destructor() {
        window.removeEventListener('keydown', this.listener)
        window.removeEventListener('keyup', this.listenerhandler)
        if (this.frameId) {
            cancelAnimationFrame(this.frameId)
            this.frameId = null
        }
    }

    changeRoom(room: number) {
        this.currentRoom = room
        this.gameObjects.forEach((obj: Obj) => obj.resetCollisions())
        this.currentRoomObjects = []
        this.gameObjects = []
        this.bg_image = null
        this.initialize()
    }

    async initialize() {
        this.timeTaken = performance.now() / 1000
        const room = this.currentRoom < 5 ? `room${this.currentRoom}` : 'boss_room'
        this.currentRoomPath = getRoomPath(room)

        if (this.currentRoom == 1) {
            this.time = 0
            this.player.health = this.player.maxHealth
            this.health.value = this.player.maxHealth
        }
        this.bg_image = await loadMapData(this.currentRoomPath, room, this.canvas, this.ctx)
        this.currentRoomObjects = (await loadMapObjects(
            room,
            this.currentRoomPath,
            this.canvas,
            this.ctx,
        )) as Obj[]
        this.currentRoomObjects.sort((a: Obj, b: Obj) => {
            const exotic_peppe = a.name
            if (exotic_peppe === 'structure' && b.name === 'switchRoomDoor') return -1
            if (
                [
                    'entranceDoor',
                    'accessDoor',
                    'ladder',
                    'switchRoomDoor',
                    'specialWall',
                    'structure',
                ].includes(exotic_peppe)
            )
                return 1
            const customA = a.custom_properties
            if (customA['type'] === 'door' || customA['type'] === 'ladder') return 1
            if (customA['type'] === 'brick_wall' || customA['type'] === 'door') return 1
            return -1
        })

        const bossStats: Character | undefined = this.availableCharacters.find(
            (character: Character) => character.name === 'gorgone rossa',
        )
        if (bossStats === undefined)
            throw new Error('Boss character not found in available characters')
        this.boss.value = new Gorg_red(
            this.canvas,
            this.ctx,
            bossStats.speed,
            bossStats.hp,
            bossStats.mana,
            bossStats.attack,
            bossStats.defence,
        )

        this.gameObjects = [...this.currentRoomObjects, this.player]
        if (this.currentRoom === 5) {
            const bossStats: Character | undefined = this.availableCharacters.find(
                (character: Character) => character.name === 'gorgone rossa',
            )
            if (bossStats === undefined)
                throw new Error('Boss character not found in available characters')
            const bossEntity = new Gorg_red(
                this.canvas,
                this.ctx,
                bossStats.speed,
                bossStats.hp,
                bossStats.mana,
                bossStats.attack,
                bossStats.defence,
            )
            this.boss.value = bossEntity
            this.gameObjects.push(bossEntity)
        } else {
            this.boss.value = undefined
        }
        this.gameObjects.forEach((obj: Obj) => {
            obj.setup()
            obj.setGameHandler(this)
        })
        this.spawner = new Spawner(
            this.canvas,
            this.ctx,
            this.gameObjects,
            this.availableCharacters.filter((o: Character) => {
                return (
                    o.name !== 'gorgone rossa' && o.name !== 'gorgone viola' && o.playable === false
                )
            }),
        )
        this.spawner
            .spawn(3, this)
            .then(() => {
                this.gameObjects.sort((a: Obj, b: Obj) => {
                    if (a.id === this.player.id) return 1
                    if (b.id === this.player.id) return -1
                    return -1
                })
                this.ai = new Ai(
                    this.player,
                    this.gameObjects.filter(
                        (o: Obj) => o instanceof Entity && o.id !== this.player.id,
                    ) as Entity[],
                )
            })
            .catch((error) => {
                throw new Error(`Error spawning enemies: ${error}`)
            })
    }

    getCurrentLevel(): number {
        return this.player.exp
    }

    setCurrentLevel(level: number) {
        this.currentRoom = level
    }

    getUsedEnhancement(): number {
        return this.usedEnhancement
    }

    getDefeatedEnemies(): number {
        return this.defeatedEnemies
    }

    setUsedEnhancement(enhancement: number) {
        this.usedEnhancement = enhancement
    }

    setDefeatedEnemies(defeatedEnemies: number) {
        this.defeatedEnemies = defeatedEnemies
    }

    isGameFinished(): boolean {
        if ((this.boss && this.boss.value && this.boss.value.isDead) || this.player.isDead) {
            console.log('game is finished!')
            return true
        } else {
            return false
        }
    }

    getTimeTaken(): string {
        const totalSeconds = Math.floor(this.time)
        const min = Math.floor(totalSeconds / 60)
        const sec = totalSeconds % 60
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    saveGameState() {
        if (!this || !this.player) return

        const gameState = {
            level: this.getCurrentLevel(),
            health: this.player.health,
            mana: this.player.mana,
            defeatedEnemies: this.getDefeatedEnemies(),
            usedEnhancements: this.getUsedEnhancement(),
            timeTaken: this.time,
        } as Stats
        localStorage.setItem(prefixed(Storage_e.STATS), JSON.stringify(gameState))
    }
}
