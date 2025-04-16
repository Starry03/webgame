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
