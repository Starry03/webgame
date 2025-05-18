import type { Entity } from './Player'
import { getRoomPath } from '@/internal/mapLogic/engine/MapUtils.ts'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject.ts'
import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject.ts'
import { loadMapData } from '@/internal/mapLogic/engine/utils/BackgroundLayerUtils.ts'
import { loadMapObjects } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'
import type { Obj } from './Obj'

export class GameHandler {
    player: Entity
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    keys: Set<string>
    bg_image: HTMLImageElement | null
    lastTimeStamp: number
    currentRoomPath: string
    currentBackgroundRoom: any
    currentRoomObjects: (NotAnimatedObject | AnimatedObject)[]

    constructor(player: Entity, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        console.log(player)
        this.ctx = ctx
        this.canvas = canvas
        this.player = player
        this.keys = new Set<string>()
        this.lastTimeStamp = 0
        this.player.preloadImages()
        this.player.idle(true)
        this.gameLoop = this.gameLoop.bind(this)
        this.currentRoomPath = getRoomPath('room1')
        this.currentBackgroundRoom = {}
        this.currentRoomObjects = []
        this.bg_image = null

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
        this.currentRoomObjects.forEach((obj: Obj) => {
            // if da togliere prima o poi
            if (obj.selectedFrames !== undefined) obj.update(timestamp)
        })
        this.player.handleInput(this.keys, deltaTime)
        this.player.update(timestamp)
        requestAnimationFrame(this.gameLoop)
    }

    async initialize() {
        this.currentRoomPath = getRoomPath('room2')
        this.bg_image = await loadMapData(this.currentRoomPath, this.canvas, this.ctx)
        console.log(this.bg_image)
        this.currentRoomObjects = await loadMapObjects('room2',this.currentRoomPath, this.canvas, this.ctx)
        this.currentRoomObjects.forEach((obj: Obj) => {
            obj.preloadImages()
            obj.idle(true)
        })
    }
}
