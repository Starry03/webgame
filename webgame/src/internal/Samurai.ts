import { Player } from '@/internal/Player'

export class Samurai extends Player {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx)
    this.framePaths = {
      run: [
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_0.png',
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_1.png',
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_2.png',
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_3.png',
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_4.png',
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_5.png',
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_6.png',
        'assets/Sprite/Giocatore/Samurai/Run/frame_0_7.png',
      ],
      attack1: [
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_0.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_1.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_2.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_3.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_4.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_5.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_6.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_7.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_8.png',
        'assets/Sprite/Giocatore/Samurai/Attack 1/frame_0_9.png',
      ],
      attack2: [
        'assets/Sprite/Giocatore/Samurai/Attack 3/frame_0_0.png',
        'assets/Sprite/Giocatore/Samurai/Attack 3/frame_0_1.png',
        'assets/Sprite/Giocatore/Samurai/Attack 3/frame_0_2.png',
        'assets/Sprite/Giocatore/Samurai/Attack 3/frame_0_3.png',
      ],
      special: [
        'assets/Sprite/Giocatore/Samurai/Attack 2/frame_0_0.png',
        'assets/Sprite/Giocatore/Samurai/Attack 2/frame_0_1.png',
        'assets/Sprite/Giocatore/Samurai/Attack 2/frame_0_2.png',
        'assets/Sprite/Giocatore/Samurai/Attack 2/frame_0_3.png',
        'assets/Sprite/Giocatore/Samurai/Attack 2/frame_0_4.png',
      ],
      idle: [
        'assets/Sprite/Giocatore/Samurai/Idle/frame_0_0.png',
        'assets/Sprite/Giocatore/Samurai/Idle/frame_0_1.png',
        'assets/Sprite/Giocatore/Samurai/Idle/frame_0_2.png',
        'assets/Sprite/Giocatore/Samurai/Idle/frame_0_3.png',
        'assets/Sprite/Giocatore/Samurai/Idle/frame_0_4.png',
        'assets/Sprite/Giocatore/Samurai/Idle/frame_0_5.png',
      ],
      hurt: [
        'assets/Sprite/Giocatore/Samurai/Hurt/frame_0_0.png',
        'assets/Sprite/Giocatore/Samurai/Hurt/frame_0_1.png',
        'assets/Sprite/Giocatore/Samurai/Hurt/frame_0_2.png',
      ],
      dead: [
        'assets/Sprite/Giocatore/Samurai/Dead/frame_0_0.png',
        'assets/Sprite/Giocatore/Samurai/Dead/frame_0_1.png',
        'assets/Sprite/Giocatore/Samurai/Dead/frame_0_2.png',
        'assets/Sprite/Giocatore/Samurai/Dead/frame_0_3.png',
        'assets/Sprite/Giocatore/Samurai/Dead/frame_0_4.png',
        'assets/Sprite/Giocatore/Samurai/Dead/frame_0_5.png',
      ],
    }
  }
}
