import { Entity } from '@/internal/Entity'

export class Werewolf extends Entity {
  constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        speed: number,
        health: number,
        mana: number,
        attackPower: number,
        defense: number,
    ) {
        super(canvas, ctx, speed, health, mana, attackPower, defense)
    this.framePaths = {
      run: [
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_0.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_1.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_2.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_3.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_4.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_5.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_6.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_7.png',
        'assets/Sprite/Nemici/Werewolf/Run/frame_0_8.png',
      ],
      attack1: [
        'assets/Sprite/Nemici/Werewolf/Attack 1/frame_0_0.png',
        'assets/Sprite/Nemici/Werewolf/Attack 1/frame_0_1.png',
        'assets/Sprite/Nemici/Werewolf/Attack 1/frame_0_2.png',
        'assets/Sprite/Nemici/Werewolf/Attack 1/frame_0_3.png',
        'assets/Sprite/Nemici/Werewolf/Attack 1/frame_0_4.png',
        'assets/Sprite/Nemici/Werewolf/Attack 1/frame_0_5.png',
      ],
      attack2: [
        'assets/Sprite/Nemici/Werewolf/Attack 2/frame_0_0.png',
        'assets/Sprite/Nemici/Werewolf/Attack 2/frame_0_1.png',
        'assets/Sprite/Nemici/Werewolf/Attack 2/frame_0_2.png',
        'assets/Sprite/Nemici/Werewolf/Attack 2/frame_0_3.png',
      ],
      special: [
        'assets/Sprite/Nemici/Werewolf/Special/frame_0_0.png',
        'assets/Sprite/Nemici/Werewolf/Special/frame_0_1.png',
        'assets/Sprite/Nemici/Werewolf/Special/frame_0_2.png',
        'assets/Sprite/Nemici/Werewolf/Special/frame_0_3.png',
        'assets/Sprite/Nemici/Werewolf/Special/frame_0_4.png',
        'assets/Sprite/Nemici/Werewolf/Special/frame_0_5.png',
        'assets/Sprite/Nemici/Werewolf/Special/frame_0_6.png',
      ],
      idle: [
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_0.png',
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_1.png',
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_2.png',
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_3.png',
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_4.png',
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_5.png',
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_6.png',
        'assets/Sprite/Nemici/Werewolf/Idle/frame_0_7.png',
      ],
      hurt: [
        'assets/Sprite/Nemici/Werewolf/Hurt/frame_0_0.png',
        'assets/Sprite/Nemici/Werewolf/Hurt/frame_0_1.png',
      ],
      dead: [
        'assets/Sprite/Nemici/Werewolf/Dead/frame_0_0.png',
        'assets/Sprite/Nemici/Werewolf/Dead/frame_0_1.png',
      ],
      opening: [],
      closing: [],
    }
  }
}
