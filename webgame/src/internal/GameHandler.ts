import type { Player } from './Player'

export class GameHandlder {
  player: Player
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  keys: Set<string>

  constructor(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.canvas = canvas
    this.player = player
    this.keys = new Set<string>()
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

  gameLoop(timestamp: any) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.handleInput(this.keys)
    this.player.update(timestamp)
    requestAnimationFrame(this.gameLoop)
  }
}
