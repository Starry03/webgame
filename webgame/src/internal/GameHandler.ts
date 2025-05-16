import type { Entity } from './Player'
import {getRoomPath} from '@/internal/mapLogic/engine/MapUtils.ts'
import {AnimatedObject} from '@/internal/mapLogic/classes/AnimatedObject.ts'
import {NotAnimatedObject} from '@/internal/mapLogic/classes/NotAnimatedObject.ts'
import {loadMapData} from "@/internal/mapLogic/engine/utils/BackgroundLayerUtils.ts";
import {loadMapObjects} from "@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts";

export class GameHandler {
  player: Entity
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  keys: Set<string>
  lastTimeStamp: number
    currentRoomPath: string
    currentBackgroundRoom: any
    currentRoomObjects: (NotAnimatedObject|AnimatedObject)[]


  constructor(player: Entity, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    console.log(player)
    this.ctx = ctx
    this.canvas = canvas
    this.player = player
    this.keys = new Set<string>()
    this.lastTimeStamp = 0
    this.player.preloadImages()
    this.player.idle(true)
    this.gameLoop = this.gameLoop.bind(this);
    this.currentRoomPath = getRoomPath("room1")
    this.currentBackgroundRoom = {}
    this.currentRoomObjects =  []

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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.currentRoomObjects.forEach(obj => {
          obj.update(timestamp);
      })
    this.player.handleInput(this.keys, deltaTime)
    this.player.update(timestamp)
    requestAnimationFrame(this.gameLoop)
  }

  async initialize() {
      this.currentRoomPath = getRoomPath("room1");
      await loadMapData(this.currentRoomPath, this.canvas, this.ctx);
      this.currentRoomObjects = await loadMapObjects(this.currentBackgroundRoom, this.canvas, this.ctx);
  }
}

