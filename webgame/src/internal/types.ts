export type Character = {
    name: string
    description: string
    mana: number
    health: number
    attack: number
    defense: number
    speed: number
    hp: number
    playable: boolean
}

export type User = {
    username: string
}

export enum Storage_e {
    PRIVATE_KEY = 'private_key',
    PUBLIC_KEY = 'public_key',
    SELECTED_CHARACTER = 'selectedCharacter',
    SERVER_PUBLIC_KEY = 'server_public_key',
    SESSION = 'session',
    TOKEN = 'token',
    USER = 'aitdt_user',
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
    OPENING = 'opening',
    CLOSING = 'closing',
}

export class Vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    compare(x: number, y: number): boolean {
        return this.x === x && this.y === y
    }

    normalize(): void {
        const mod = Math.sqrt(this.x ** 2 + this.y ** 2)
        if (mod === 0) return
        this.x /= mod
        this.y /= mod
    }

    direction(): Vector2 {
        let newVector = new Vector2(this.x, this.y)
        if (newVector.x < 0.5) newVector.x = 0
        if (newVector.x > 0.5) newVector.x = 1
        if (newVector.y < 0.5) newVector.y = 0
        if (newVector.y > 0.5) newVector.y = 1
        return newVector
    }

    toString(): string {
        return `(${this.x}, ${this.y})`
    }
}
