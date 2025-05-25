import { Entity } from './Entity'
import { getRoomPath } from '@/internal/mapLogic/engine/MapUtils.ts'
import { loadMapObjects } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'
import type { Obj } from './Obj'
import { Storage_e, Vector2, type Character } from './types'
import { Collider } from './collision'
import { Gorg_red } from './Gorg_red'
import { prefixed } from './cryptoutils'
import { Spawner } from './spawner'
import { Ai } from './ai'
import { loadMapData } from '@/internal/mapLogic/engine/utils/BackgroundLayerUtils.ts'
import { type Router, useRouter } from 'vue-router'

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
    boss: Entity | undefined
    availableCharacters: Character[]
    currentRoom: number
    spawner: Spawner | null
    ai: Ai | null
    usedEnhancement: number
    defeatedEnemies: number
    router: Router
    timeTaken: number

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
        this.spawner = null
        this.ai = null
        this.usedEnhancement = 0
        this.defeatedEnemies = 0
        this.router = useRouter()
        this.timeTaken = 0

        window.addEventListener('keydown', (e) => {
            e.preventDefault()
            this.keys.add(e.key)
        })

        window.addEventListener('keyup', (e) => {
            e.preventDefault()
            this.keys.delete(e.key)
            if (this.keys.size === 0) this.player.idle()
        })
    }

    gameLoop(timestamp: number) {
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

        this.gameObjects
            .filter((obj: Obj) => obj instanceof Entity)
            .forEach((obj: Entity) => obj.regenMana(deltaTime))
        this.gameObjects.forEach((obj: Obj) => {
            if (obj.selectedFrames == undefined) return
            obj.update(timestamp, deltaTime)
        })
        if (this.isGameFinished()) {
            this.saveGameState()
            this.router.push('/stats')
            return;
        }
        else {
            requestAnimationFrame(this.gameLoop)
        }

    }

    changeRoom(room: number) {
        this.currentRoom = room
        this.gameObjects.forEach((obj: Obj) => obj.resetCollisions())
        this.currentRoomObjects = []
        this.gameObjects = []
        this.boss = undefined
        this.bg_image = null
        this.initialize()
    }

    async initialize() {
        const room = this.currentRoom < 5 ? `room${this.currentRoom}` : 'boss_room'
        this.currentRoomPath = getRoomPath(room)
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
            (character: Character) => character.name === 'gorgone viola',
        )
        if (bossStats === undefined)
            throw new Error('Boss character not found in available characters')
        this.boss = new Gorg_red(
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
            this.gameObjects.push(this.boss)
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
        return this.currentRoom
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

    isGameFinished():  boolean {
        if ((this.boss && this.boss.isDead) || this.player.isDead) {
            console.log("game is finished!")
            return true;
        }
        else {
            console.log("game!!!")
            return false;
        }
    }

    getTimeTaken(): number {
        return 0;
    }

    setTimeTaken(timeTaken: number) {
        this.timeTaken = timeTaken
    }

    saveGameState() {
        if (!this || !this.player) return

        const gameState = {
            level: this.getCurrentLevel(),
            playerSpeed: this.player.speed,
            playerAttack: this.player.attack,
            playerDefense: this.player.defense,
            health: this.player.health,
            maxHealth: this.player.maxHealth,
            mana: this.player.mana,
            maxMana: this.player.maxMana,
            defeatedEnemies: this.getDefeatedEnemies(),
            usedEnhancement: this.getUsedEnhancement(),
            timeTaken: this.getTimeTaken()
        };
        localStorage.setItem('gameState', JSON.stringify(gameState));
        console.log("salvataggio completato!!")
    }
}
