import type { Entity } from './Entity'
import {getRoomPath, populateBossRoom, populateRoom3, populateRoom4} from '@/internal/mapLogic/engine/MapUtils.ts'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import { loadMapData } from '@/internal/mapLogic/engine/utils/BackgroundLayerUtils.ts'
import { loadMapObjects } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'
import type { Obj } from './Obj'
import { AnimationType, Vector2 } from './types'
import { Collider } from './collision'
import { Gorg_red } from './Gorg_red'
import { computed, reactive, ref } from 'vue'

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
    boss: Obj | undefined
    currentRoom: number

    constructor(player: Entity, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.canvas = canvas
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
        this.currentRoom = 5

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
        if (this.player.mana < this.player.maxMana) {
            this.player.mana = Math.min(
                this.player.maxMana,
                this.player.mana + this.player.manaRegenRate * deltaTime,
            )
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()
        if (this.bg_image)
            this.ctx.drawImage(this.bg_image, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.restore()
        this.player.handleInput(this.keys, deltaTime)
        Collider.update_collisions(this.gameObjects)
        this.player.attack(this.keys, this.gameObjects)
        this.gameObjects.forEach((obj: Obj) => {
            if (obj.selectedFrames == undefined) {
                return
            }
            obj.update(timestamp, deltaTime)
        })
        requestAnimationFrame(this.gameLoop)
    }

    changeRoom(room: number) {
        this.currentRoom = room
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
        
        populateBossRoom(this.currentRoomObjects)

        this.currentRoomObjects.forEach((obj: Obj) => {
            obj.preloadImages()
            obj.idle(true)
        })
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
        const boss = ref<any>(null)

        const bossStats = {
            canvas: this.canvas,
            ctx: this.ctx,
            speed: 65,
            health: 1200,
            mana: 800,
            level: 20,
            attackPower: 120,
            defense: 60,
            position: { x: 500, y: 200 }
        }

        const bossEntity = reactive(
            new Gorg_red(
                this.canvas,
                this.ctx,
                bossStats.speed,
                bossStats.health,
                bossStats.mana,
                bossStats.attackPower,
                bossStats.defense,
            )
        )
        bossEntity.name = 'Gorgone Rossa'
        bossEntity.custom_properties = { collidable: true }
        bossEntity.preloadImages()
        bossEntity.idle(true)

        this.boss = bossEntity

        this.gameObjects = [...this.currentRoomObjects, this.player, this.boss].filter((obj): obj is Obj | Entity => obj !== undefined)
        this.gameObjects.forEach((obj: Obj) => {
            obj.setGameHandler(this)
        })
    }
}
