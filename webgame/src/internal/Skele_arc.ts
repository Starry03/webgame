import { Entity } from '@/internal/Player'

export class Skele_arc extends Entity {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, speed: number, health: number, mana: number) {
    super(canvas, ctx, speed, health, mana)
    this.framePaths = {
      run: [
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_4.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_5.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_6.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Run/frame_0_7.png',
      ],
      attack1: [
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 1/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 1/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 1/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 1/frame_0_3.png',
      ],
      attack2: [
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_4.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_5.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_6.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_7.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_8.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_9.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_10.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_11.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_12.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_13.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_14.png',
      ],
      special: [
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_4.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_5.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_6.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_7.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_8.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_9.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_10.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_11.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_12.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_13.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Attack 2/frame_0_14.png',
      ],
      idle: [
        'assets/Sprite/Nemici/Skeleton_Archer/Idle/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Idle/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Idle/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Idle/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Idle/frame_0_4.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Idle/frame_0_5.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Idle/frame_0_6.png',
      ],
      hurt: [
        'assets/Sprite/Nemici/Skeleton_Archer/Hurt/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Hurt/frame_0_1.png',
      ],
      dead: [
        'assets/Sprite/Nemici/Skeleton_Archer/Dead/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Dead/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Dead/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Dead/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Archer/Dead/frame_0_4.png',
      ],
      opening: [],
      closing: [],
    }
  }
}
