import { Entity } from '@/internal/Entity'

export class Skele_war extends Entity {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, speed: number, health: number, mana: number) {
    super(canvas, ctx, speed, health, mana)
    this.framePaths = {
      run: [
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_4.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_5.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_6.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Run/frame_0_7.png',
      ],
      attack1: [
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 2/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 1/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 1/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 1/frame_0_3.png',
      ],
      attack2: [
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 3/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 3/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 3/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Attack 3/frame_0_3.png',
      ],
      special: [
        'assets/Sprite/Nemici/Skeleton_Warrior/Special/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Special/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Special/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Special/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Special/frame_0_4.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Special/frame_0_5.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Special/frame_0_6.png',
      ],
      idle: [
        'assets/Sprite/Nemici/Skeleton_Warrior/Idle/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Idle/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Idle/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Idle/frame_0_3.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Idle/frame_0_4.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Idle/frame_0_5.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Idle/frame_0_6.png',
      ],
      hurt: [
        'assets/Sprite/Nemici/Skeleton_Warrior/Hurt/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Hurt/frame_0_1.png',
      ],
      dead: [
        'assets/Sprite/Nemici/Skeleton_Warrior/Dead/frame_0_0.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Dead/frame_0_1.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Dead/frame_0_2.png',
        'assets/Sprite/Nemici/Skeleton_Warrior/Dead/frame_0_3.png',
      ],
      opening: [],
      closing: [],
    }
  }
}
