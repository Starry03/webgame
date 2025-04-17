import type { Player } from './Player'

export class GameHandlder {
  player: Player
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.canvas = canvas
    this.player = player
    this.player.idle()
    this.gameLoop = this.gameLoop.bind(this)

    window.addEventListener('keydown', (e) => {
      this.player.move(e.key)
      this.player.attack(e.key)
    })

    window.addEventListener('keyup', (e) => {
      this.player.idle()
    })
  }
  gameLoop(timestamp: any) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.update(timestamp)
    requestAnimationFrame(this.gameLoop)
  }
}
