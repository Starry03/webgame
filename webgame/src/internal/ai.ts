import type { Entity } from './Entity'
import { Vector2 } from './types'

type WeightedMove = {
    position: Vector2
    weight: number
}

export class Ai {
    player: Entity
    enemies: Entity[]
    moveCombinations: string[] = ['w', 'wa', 'wd', 'd', 'ds', 'dw', 's', 'sa', 'sd', 'a', 'ad', 'd']

    constructor(player: Entity, enemies: Entity[]) {
        this.player = player
        this.enemies = enemies
    }

    private heuristic(pos: Vector2, dir: Vector2, a: Entity, goal: Entity): number {
        if (!a.canMove(pos, dir)) return Infinity
        let dx = goal.pos.x - pos.x
        let dy = goal.pos.y - pos.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    update(timestamp: number, deltaTime: number) {
        let wantedPosition: WeightedMove[] = []
        if (this.player.isDead) return
        this.enemies.forEach((enemy: Entity, index: number) => {
            if (enemy.isDead) return
            const moves: WeightedMove[] = []
            this.moveCombinations.forEach((comb) => {
                const moveResult = enemy.move(new Set(comb.split('')), deltaTime, true)
                if (moveResult && moveResult.possible_position && moveResult.dir) {
                    const wantedPos = moveResult.possible_position
                    const dir = moveResult.dir
                    const weight = this.heuristic(wantedPos, dir, enemy, this.player)
                    moves.push({ position: wantedPos, weight } as WeightedMove)
                }
            })
            moves.sort((a, b) => a.weight - b.weight)
            if (moves.length === 0) return
        })
    }
}
