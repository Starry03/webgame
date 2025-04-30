import type { Player } from './Player'

export class GameHandlder {
  player: Player
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  keys: Set<string>
  lastTimeStamp: number

  constructor(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.canvas = canvas
    this.player = player
    this.keys = new Set<string>()
    this.lastTimeStamp = 0
    this.player.preloadImages()
    this.player.idle()
    this.gameLoop = this.gameLoop.bind(this)

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
    this.player.handleInput(this.keys, deltaTime)
    this.player.update(timestamp)
    requestAnimationFrame(this.gameLoop)
  }
}
