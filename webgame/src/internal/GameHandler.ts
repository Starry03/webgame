import type { Entity } from './Entity'
import { getRoomPath } from '@/internal/mapLogic/engine/MapUtils.ts'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
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

        // dati mappa = loadMapData(this.currentRoomPath, this.canvas, this.ctx)

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
        this.player.handleInput(this.keys, deltaTime)
        Collider.update_collisions(this.gameObjects)
        this.gameObjects.forEach((obj: Obj) => {
            if (obj.selectedFrames == undefined) return
            obj.update(timestamp, deltaTime)
        })
        requestAnimationFrame(this.gameLoop)
    }

    async initialize() {
        this.currentRoomPath = getRoomPath('room4')
        this.bg_image = await loadMapData(this.currentRoomPath, this.canvas, this.ctx)
        this.currentRoomObjects = (await loadMapObjects(
            'room4',
            this.currentRoomPath,
            this.canvas,
            this.ctx,
        )) as Obj[]
        this.currentRoomObjects.sort((a: Obj, b: Obj) => {
            const customA = a.custom_properties
            const customB = b.custom_properties
            if (customA['type'] === 'door') return 1
            else if (customB['type'] === 'door') return -1
            return 0
        })
        this.currentRoomObjects.forEach((obj: Obj) => {
            obj.preloadImages()
            obj.idle(true)
        })
        this.gameObjects = [...this.currentRoomObjects, this.player]
    }
}
