import { AnimationType, Vector2 } from './types'
import { Obj } from './Obj'

export class Player extends Obj {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx)
    this.currentAnimation = AnimationType.IDLE
  }

  move(key: string) {
    let newDirection = new Vector2(0, 0)
    if (key === 'ArrowUp' || key === 'w') {
      newDirection.y = -1
    } else if (key === 'ArrowDown' || key === 's') {
      newDirection.y = 1
    }
    if (key === 'ArrowLeft' || key === 'a') {
      newDirection.x = -1
    } else if (key === 'ArrowRight' || key === 'd') {
      newDirection.x = 1
    }
    this.pos.x += newDirection.x * this.speed
    this.pos.y += newDirection.y * this.speed
    if (!newDirection.compare(new Vector2(0, 0))) {
      this.changeAnimation(AnimationType.RUN)
      this.facingDirection = newDirection
    }
  }

  attack(keyPressed: string) {
    if (keyPressed === 'q') {
      this.changeAnimation(AnimationType.ATTACK_1)
    } else if (keyPressed === 'e') {
      this.changeAnimation(AnimationType.ATTACK_2)
    } else if (keyPressed === 'r') {
      this.changeAnimation(AnimationType.SPECIAL)
    }
  }
}
