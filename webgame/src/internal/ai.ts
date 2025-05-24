import type { Entity } from './Entity'

export class Ai {
    player: Entity
    enemies: Entity[]

    constructor(player: Entity, enemies: Entity[]) {
        this.player = player
        this.enemies = enemies
    }

    update(timestamp: number, deltaTime: number) {
        
    }
}
