import { Player } from '@/internal/Player'

export class Gorg_purp extends Player {
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, speed: number, health: number) {
    super(canvas, ctx)
    this.framePaths = {
      run: [
        'assets/Sprite/Nemici/Gorgon_2/Run/frame_0_0.png',
        'assets/Sprite/Nemici/Gorgon_2/Run/frame_0_1.png',
        'assets/Sprite/Nemici/Gorgon_2/Run/frame_0_2.png',
        'assets/Sprite/Nemici/Gorgon_2/Run/frame_0_3.png',
        'assets/Sprite/Nemici/Gorgon_2/Run/frame_0_4.png',
        'assets/Sprite/Nemici/Gorgon_2/Run/frame_0_5.png',
        'assets/Sprite/Nemici/Gorgon_2/Run/frame_0_6.png',
      ],
      attack1: [
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_0.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_1.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_2.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_3.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_4.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_5.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_6.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_7.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_8.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 2/frame_0_9.png',
      ],
      attack2: [
        'assets/Sprite/Nemici/Gorgon_2/Attack 3/frame_0_0.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 3/frame_0_1.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 3/frame_0_2.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 3/frame_0_3.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 3/frame_0_4.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 3/frame_0_5.png',
        'assets/Sprite/Nemici/Gorgon_2/Attack 3/frame_0_6.png',
      ],
      special: [
        'assets/Sprite/Nemici/Gorgon_2/Special/frame_0_0.png',
        'assets/Sprite/Nemici/Gorgon_2/Special/frame_0_1.png',
        'assets/Sprite/Nemici/Gorgon_2/Special/frame_0_2.png',
        'assets/Sprite/Nemici/Gorgon_2/Special/frame_0_3.png',
        'assets/Sprite/Nemici/Gorgon_2/Special/frame_0_4.png',
      ],
      idle: [
        'assets/Sprite/Nemici/Gorgon_2/Idle/frame_0_0.png',
        'assets/Sprite/Nemici/Gorgon_2/Idle/frame_0_1.png',
        'assets/Sprite/Nemici/Gorgon_2/Idle/frame_0_2.png',
        'assets/Sprite/Nemici/Gorgon_2/Idle/frame_0_3.png',
        'assets/Sprite/Nemici/Gorgon_2/Idle/frame_0_4.png',
        'assets/Sprite/Nemici/Gorgon_2/Idle/frame_0_5.png',
        'assets/Sprite/Nemici/Gorgon_2/Idle/frame_0_6.png',
      ],
      hurt: [
        'assets/Sprite/Nemici/Gorgon_2/Hurt/frame_0_0.png',
        'assets/Sprite/Nemici/Gorgon_2/Hurt/frame_0_1.png',
        'assets/Sprite/Nemici/Gorgon_2/Hurt/frame_0_2.png',
      ],
      dead: [
        'assets/Sprite/Nemici/Gorgon_2/Dead/frame_0_0.png',
        'assets/Sprite/Nemici/Gorgon_2/Dead/frame_0_1.png',
        'assets/Sprite/Nemici/Gorgon_2/Dead/frame_0_2.png',
      ],
    }
  }
}
