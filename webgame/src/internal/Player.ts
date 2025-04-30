import { AnimationType, Vector2 } from './types'
import { Obj } from './Obj'

export class Player extends Obj {
  speed: number
  health: number
  maxHealth: number

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    speed: number,
    health: number,
  ) {
    super(canvas, ctx)
    this.currentAnimation = AnimationType.IDLE
    this.canAttack = true
    this.speed = speed
    this.health = health
    this.maxHealth = health
    this.cooldowns.set(AnimationType.ATTACK_1, 0)
    this.cooldowns.set(AnimationType.ATTACK_2, 0)
    this.cooldowns.set(AnimationType.SPECIAL, 0)
  }

  handleInput(keys: Set<string>, deltaTime: number) {
    this.move(keys, deltaTime)
    this.attack(keys)
  }

  move(keys: Set<string>, deltaTime: number) {
    let dir = new Vector2(
      (keys.has('d') || keys.has('ArrowRight') ? 1 : 0) +
        (keys.has('a') || keys.has('ArrowLeft') ? -1 : 0),
      (keys.has('s') || keys.has('ArrowDown') ? 1 : 0) +
        (keys.has('w') || keys.has('ArrowUp') ? -1 : 0),
    )
    dir.normalize()
    this.pos.x += dir.x * this.speed * deltaTime * 4
    this.pos.y += dir.y * this.speed * deltaTime * 4
    if (!dir.compare(new Vector2(0, 0))) {
      this.changeAnimation(AnimationType.RUN)
      this.facingDirection = dir
    }
  }

  attack(keys: Set<string>) {
    let isAttacking: boolean = true
    let cooldownFactor: number = 1
    let usedAnimation: AnimationType = AnimationType.IDLE
    if (keys.has('e') && this.cooldowns.get(AnimationType.ATTACK_1) == 0) {
      this.changeAnimation(AnimationType.ATTACK_1)
      usedAnimation = AnimationType.ATTACK_1
    } else if (keys.has('q') && this.cooldowns.get(AnimationType.ATTACK_2) == 0) {
      this.changeAnimation(AnimationType.ATTACK_2)
      usedAnimation = AnimationType.ATTACK_2
      cooldownFactor = 2.5
    } else if (keys.has('r') && this.cooldowns.get(AnimationType.SPECIAL) == 0) {
      this.changeAnimation(AnimationType.SPECIAL)
      usedAnimation = AnimationType.SPECIAL
      cooldownFactor = 10
    } else isAttacking = false
    if (isAttacking && this.canAttack) {
      this.cooldowns.set(usedAnimation, this.speed * 10 * cooldownFactor)
      console.log(this.cooldowns)
      setTimeout(
        () => {
          this.cooldowns.set(usedAnimation, 0)
          console.log('reset')
          console.log(this.cooldowns)
        },
        this.speed * 10 * cooldownFactor,
      )
    }
  }
}
