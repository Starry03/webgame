import { Entity } from '@/internal/Player'

export class Thief extends Entity {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, speed: number, health: number, mana: number) {
    super(canvas, ctx, speed, health, mana)
    this.framePaths = {
      run: [
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_0.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_1.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_2.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_3.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_4.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_5.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_6.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Run/frame_0_7.png',
      ],
      attack1: [
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_0.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_1.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_2.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_3.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_4.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_5.png',
      ],
      attack2: [
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 3/frame_0_0.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 3/frame_0_1.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 3/frame_0_2.png',
      ],
      special: [
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_0.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_1.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_2.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_3.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_4.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Attack 1/frame_0_5.png',
      ],
      idle: [
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_0.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_1.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_2.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_3.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_4.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_5.png',
        /*'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_6.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_7.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_8.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_9.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Idle/frame_0_10.png',*/
      ],
      hurt: [
        'assets/Sprite/Giocatore/Karasu_tengu/Hurt/frame_0_0.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Hurt/frame_0_1.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Hurt/frame_0_2.png',
      ],
      dead: [
        'assets/Sprite/Giocatore/Karasu_tengu/Dead/frame_0_0.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Dead/frame_0_1.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Dead/frame_0_2.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Dead/frame_0_3.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Dead/frame_0_4.png',
        'assets/Sprite/Giocatore/Karasu_tengu/Dead/frame_0_5.png',
      ],
    }
  }
}
