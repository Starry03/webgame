import type { Entity } from './Entity'
import { getRoomPath } from '@/internal/mapLogic/engine/MapUtils.ts'
import { loadMapData } from '@/internal/mapLogic/engine/utils/BackgroundLayerUtils.ts'
import { loadMapObjects } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'
import type { Obj } from './Obj'
import { Vector2 } from './types'
import { Collider } from './collision'

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
    currentRoom: string

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
        this.currentRoom = 'room2'

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

    async initialize() {
        this.currentRoomPath = getRoomPath(this.currentRoom)
        this.bg_image = await loadMapData(this.currentRoomPath, this.currentRoom, this.canvas, this.ctx)
        this.currentRoomObjects = (await loadMapObjects(
            this.currentRoom,
            this.currentRoomPath,
            this.canvas,
            this.ctx,
        )) as Obj[]
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
        this.gameObjects = [...this.currentRoomObjects, this.player]
    }
}
