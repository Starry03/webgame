import { AnimationType, Vector2 } from './types'
import { Obj } from './Obj'

export class Player extends Obj {
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    super(canvas, ctx)
    this.currentAnimation = AnimationType.IDLE
  }

  handleInput(keys: Set<string>) {
    this.move(keys)
    this.attack(keys)
  }

  move(keys: Set<string>) {
    let dir = new Vector2(
      (keys.has('d') || keys.has('ArrowRight') ? 1 : 0) +
        (keys.has('a') || keys.has('ArrowLeft') ? -1 : 0),
      (keys.has('s') || keys.has('ArrowDown') ? 1 : 0) +
        (keys.has('w') || keys.has('ArrowUp') ? -1 : 0),
    )
    dir.normalize()
    this.pos.x += dir.x * this.speed
    this.pos.y += dir.y * this.speed
    if (!dir.compare(new Vector2(0, 0))) {
      this.changeAnimation(AnimationType.RUN)
      this.facingDirection = dir
    }
  }

  attack(keys: Set<string>) {
    if (keys.has('q')) {
      this.changeAnimation(AnimationType.ATTACK_1)
    } else if (keys.has('e')) {
      this.changeAnimation(AnimationType.ATTACK_2)
    } else if (keys.has('r')) {
      this.changeAnimation(AnimationType.SPECIAL)
    }
  }
}
