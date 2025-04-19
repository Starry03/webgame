export type Character = {
  name: string
  description: string
  mana: number
  health: number
  attack: number
  defense: number
  speed: number
  hp: number
}

export enum AttackType {
  LIGHT = 'light',
  HEAVY = 'heavy',
  SPECIAL = 'special',
}

export enum AnimationType {
  RUN = 'run',
  ATTACK_1 = 'attack1',
  ATTACK_2 = 'attack2',
  SPECIAL = 'special',
  IDLE = 'idle',
  HURT = 'hurt',
  DEAD = 'dead',
}

export class Vector2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  compare(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y
  }
  normalize(): void {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2)
    if (length === 0) return
    this.x /= length
    this.y /= length
  }
}
