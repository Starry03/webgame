import { Entity } from '@/internal/Player'

export class Plent extends Entity {
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, speed: number, health: number) {
    super(canvas, ctx)
    this.framePaths = {
      run: [
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_0.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_1.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_2.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_3.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_4.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_5.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_6.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_7.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_8.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_9.png',
        'assets/Sprite/Nemici/Plent/Disguise/frame_0_10.png',
      ],
      attack1: [
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_0.png',
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_1.png',
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_2.png',
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_3.png',
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_4.png',
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_5.png',
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_6.png',
        'assets/Sprite/Nemici/Plent/Attack 1/frame_0_7.png',
      ],
      attack2: [
        'assets/Sprite/Nemici/Plent/Attack 2/frame_0_0.png',
        'assets/Sprite/Nemici/Plent/Attack 2/frame_0_1.png',
        'assets/Sprite/Nemici/Plent/Attack 2/frame_0_2.png',
        'assets/Sprite/Nemici/Plent/Attack 2/frame_0_3.png',
        'assets/Sprite/Nemici/Plent/Attack 2/frame_0_4.png',
        'assets/Sprite/Nemici/Plent/Attack 2/frame_0_5.png',
        'assets/Sprite/Nemici/Plent/Attack 2/frame_0_6.png',
      ],
      special: [
        'assets/Sprite/Nemici/Plent/Poison/frame_0_0.png',
        'assets/Sprite/Nemici/Plent/Poison/frame_0_1.png',
        'assets/Sprite/Nemici/Plent/Poison/frame_0_2.png',
        'assets/Sprite/Nemici/Plent/Poison/frame_0_3.png',
        'assets/Sprite/Nemici/Plent/Poison/frame_0_4.png',
        'assets/Sprite/Nemici/Plent/Poison/frame_0_5.png',
        'assets/Sprite/Nemici/Plent/Poison/frame_0_6.png',
      ],
      idle: [
        'assets/Sprite/Nemici/Plent/Idle/frame_0_0.png',
        'assets/Sprite/Nemici/Plent/Idle/frame_0_1.png',
        'assets/Sprite/Nemici/Plent/Idle/frame_0_2.png',
        'assets/Sprite/Nemici/Plent/Idle/frame_0_3.png',
        'assets/Sprite/Nemici/Plent/Idle/frame_0_4.png',
      ],
      hurt: [
        'assets/Sprite/Nemici/Plent/Hurt/frame_0_0.png',
        'assets/Sprite/Nemici/Plent/Hurt/frame_0_1.png',
        'assets/Sprite/Nemici/Plent/Hurt/frame_0_2.png',
      ],
      dead: [
        'assets/Sprite/Nemici/Plent/Dead/frame_0_0.png',
        'assets/Sprite/Nemici/Plent/Dead/frame_0_1.png',
      ],
    }
  }
}
