import type { Entity } from './Player'
import {loadRoomByName} from '@/internal/mapLogic/engine/MapUtils.ts'
import {AnimatedObject} from '@/internal/mapLogic/classes/AnimatedObject.ts'
import {NotAnimatedObject} from '@/internal/mapLogic/classes/NotAnimatedObject.ts'

export class GameHandlder {
  player: Entity
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  keys: Set<string>
  lastTimeStamp: number
    currentRoomObjects: (AnimatedObject|NotAnimatedObject)[] = []
    background_result: any

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

      this.background_result =

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

      this.loadInitialRoom();

      this.currentRoomObjects.forEach(obj => {
          obj.update(timestamp);
      })
    this.player.handleInput(this.keys, deltaTime)
    this.player.update(timestamp)
    requestAnimationFrame(this.gameLoop)
  }

    async loadInitialRoom() {
        try {
            this.currentRoomObjects = await loadRoomByName('room1', this.canvas, this.ctx);
            requestAnimationFrame(this.gameLoop);
        } catch (error) {
            console.error('Errore nel caricamento della stanza iniziale:', error);
        }
    }

  async loadRoom(roomName: string): Promise<void> {
      try {
          this.currentRoomObjects = await loadRoomByName(roomName, this.canvas, this.ctx)
      }
      catch (error) {
          console.error(`error during ${roomName} loading:`, error);
      }
  }

}

