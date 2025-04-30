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
    this.cooldowns.add(AnimationType.ATTACK_1)
    this.cooldowns.add(AnimationType.ATTACK_2)
    this.cooldowns.add(AnimationType.SPECIAL)
  }

  handleInput(keys: Set<string>) {
    this.move(keys)
    this.attack(keys)
  }

  move(keys: Set<string>) {
    if (this.isAttacking) return
    let dir = new Vector2(
      (keys.has('d') || keys.has('ArrowRight') ? 1 : 0) +
        (keys.has('a') || keys.has('ArrowLeft') ? -1 : 0),
      (keys.has('s') || keys.has('ArrowDown') ? 1 : 0) +
        (keys.has('w') || keys.has('ArrowUp') ? -1 : 0),
    )
    dir.normalize()
    this.pos.x += (dir.x * this.speed) / 10
    this.pos.y += (dir.y * this.speed) / 10
    if (!dir.compare(new Vector2(0, 0))) {
      this.changeAnimation(AnimationType.RUN)
      this.facingDirection = dir
    }
  }

  attack(keys: Set<string>) {
    let isAttacking: boolean = true
    let cooldownFactor: number = 1
    let usedAnimation: AnimationType = AnimationType.IDLE
    if (keys.has('e') && this.cooldowns.has(AnimationType.ATTACK_1)) {
      this.changeAnimation(AnimationType.ATTACK_1)
      usedAnimation = AnimationType.ATTACK_1
    } else if (keys.has('q') && this.cooldowns.has(AnimationType.ATTACK_2)) {
      this.changeAnimation(AnimationType.ATTACK_2)
      usedAnimation = AnimationType.ATTACK_2
      cooldownFactor = 2.5
    } else if (keys.has('r') && this.cooldowns.has(AnimationType.SPECIAL)) {
      this.changeAnimation(AnimationType.SPECIAL)
      usedAnimation = AnimationType.SPECIAL
      cooldownFactor = 10
    } else isAttacking = false
    if (isAttacking && this.canAttack) {
      setTimeout(() => this.cooldowns.add(usedAnimation), this.speed * 10 * cooldownFactor)
    }
  }
}
