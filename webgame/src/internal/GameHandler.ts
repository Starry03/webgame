import type { Player } from './Animazioni/Player'

export class GameHandlder {
  player: Player
  keys: any = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
    q: false,
    e: false,
    r: false,
  }
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.canvas = canvas
    this.player = player
    this.player.loadFrames(this.player.currentAnimation)
    this.gameLoop = this.gameLoop.bind(this)

    window.addEventListener('keypress', (e) => {
      this.keys[e.key] = true
    })

    window.addEventListener('keyup', (e) => {
      this.player.idle()
      console.log(this.player.currentAnimation)
    })
  }
  gameLoop(timestamp: any) {
    if (Object.keys(this.keys).length !== 0) {
      this.player.animationChanged = this.player.handleInput(this.keys)
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.update(timestamp)
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      w: false,
      a: false,
      s: false,
      d: false,
      q: false,
      e: false,
      r: false,
    }
    requestAnimationFrame(this.gameLoop)
  }
}
