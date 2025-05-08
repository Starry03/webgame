import { AnimationType, Vector2 } from './types'
import { Obj } from './Obj'
import { ref } from 'vue'

export const cooldownE = ref(0);
export const cooldownQ = ref(0); // Cooldown per l'attacco Q
export const cooldownR = ref(0); // Cooldown per l'attacco R
export const maxCooldownE = 0.5; // Cooldown massimo per Q in secondi
export const maxCooldownQ = 2.5; // Cooldown massimo per Q in secondi
export const maxCooldownR = 10; // Cooldown massimo per R in secondi

// Funzione per avviare il cooldown
export function startCooldown(ability: 'Q' | 'R') {
  if (ability === 'Q' && cooldownQ.value === 0) {
    cooldownQ.value = maxCooldownQ;
    const interval = setInterval(() => {
      cooldownQ.value -= 0.1;
      if (cooldownQ.value <= 0){
        cooldownQ.value = 0; // Reset cooldown to 0
        clearInterval(interval);
      }
    }, 100);
  } else if (ability === 'R' && cooldownR.value === 0) {
    cooldownR.value = maxCooldownR;
    const interval = setInterval(() => {
      cooldownR.value -= 0.1;
      if (cooldownR.value <= 0){
        cooldownR.value = 0; // Reset cooldown to 0
        clearInterval(interval);
      }
    }, 100);
  }
}

export class Entity extends Obj {
  speed: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    speed: number,
    health: number,
    mana: number,
    pos: Vector2 = new Vector2(50, 50),
    dim: Vector2 = new Vector2(100, 100),
  ) {
    super(canvas, ctx, AnimationType.IDLE, true, pos, dim)
    this.currentAnimation = AnimationType.IDLE
    this.speed = speed
    this.health = health
    this.maxHealth = health
    this.mana = mana
    this.maxMana = mana
    this.cooldowns.set(AnimationType.ATTACK_1, 0)
    this.cooldowns.set(AnimationType.ATTACK_2, 0)
    this.cooldowns.set(AnimationType.SPECIAL, 0)
  }

  handleInput(keys: Set<string>, deltaTime: number) {
    this.move(keys, deltaTime)
    this.attack(keys)
  }

  move(keys: Set<string>, deltaTime: number) {
    if (this.isAnimationBlocking) return
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
      this.changeAnimation(AnimationType.ATTACK_1, true)
      usedAnimation = AnimationType.ATTACK_1
      console.log('Attacco E')
    } else if (keys.has('q') && cooldownQ.value === 0) {
      this.changeAnimation(AnimationType.ATTACK_2, true)
      usedAnimation = AnimationType.ATTACK_2
      startCooldown('Q')
      console.log('Attacco Q')
    } else if (keys.has('r') && cooldownR.value === 0) {
      this.changeAnimation(AnimationType.SPECIAL, true)
      usedAnimation = AnimationType.SPECIAL
      startCooldown('R')
      console.log('Attacco R')
    } else isAttacking = false

    if (!isAttacking) return

    this.cooldowns.set(usedAnimation, this.speed * 10 * cooldownFactor)
    setTimeout(
      () => {
        this.cooldowns.set(usedAnimation, 0)
      },
      this.speed * 10 * cooldownFactor,
    )
  }
}
