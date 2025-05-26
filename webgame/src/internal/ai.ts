import { Collider, type CollisionInfo } from './collision'
import type { Entity } from './Entity'
import { Vector2 } from './types'

type WeightedMove = {
    object: Entity
    position: Vector2
    weight: number
    move: string
}

export class Ai {
    player: Entity
    enemies: Entity[]
    moveCombinations: string[] = ['w', 'wa', 'wd', 'd', 'ds', 'dw', 's', 'sa', 'sd', 'a', 'ad', 'd']
    keys = new Set<string>(['r', 'q', 'e'])

    constructor(player: Entity, enemies: Entity[]) {
        this.player = player
        this.enemies = enemies
    }

    heuristic(pos: Vector2, dir: Vector2, a: Entity, goal: Entity): number {
        if (!a.canMove(pos, dir)) return 9999999999

        const dx = goal.pos.x - pos.x
        const dy = goal.pos.y - pos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        return dist
    }

    update(deltaTime: number) {
        return new Promise<void>((resolve) => {
            let wantedPosition: WeightedMove[] = []
            if (this.player.isDead) {
                resolve()
                return
            }
            this.enemies.forEach((enemy: Entity) => {
                if (enemy.isDead) return
                if (
                    !enemy
                        .getRelDirection(this.player)
                        .direction()
                        .compare(enemy.facingDirection.x, enemy.facingDirection.y)
                )
                    enemy.turn(enemy.getRelDirection(this.player))
                if (
                    Array.from(enemy.collidedObjects).some(
                        (o: CollisionInfo) => o.other.id === this.player.id,
                    )
                ) {
                    enemy.attack(this.keys)
                }
                const moves: WeightedMove[] = []
                this.moveCombinations.forEach((comb) => {
                    const moveResult = enemy.move(new Set(comb.split('')), deltaTime, true)
                    if (moveResult && moveResult.possible_position && moveResult.dir) {
                        const wantedPos = moveResult.possible_position
                        const dir = moveResult.dir
                        const weight = this.heuristic(wantedPos, dir, enemy, this.player)
                        moves.push({
                            object: enemy,
                            position: wantedPos,
                            weight: weight,
                            move: comb,
                        } as WeightedMove)
                    }
                })
                moves.sort((a, b) => a.weight - b.weight)
                if (moves.length === 0) return
                moves.forEach((move: WeightedMove) => {
                    const hasCollisions = wantedPosition.map((wp: WeightedMove) => {
                        return Collider.collides(
                            move.position,
                            move.object.pos,
                            wp.position,
                            wp.object.pos,
                        )
                    })
                    if (!hasCollisions.includes(true)) wantedPosition.push(move)
                })
            })
            wantedPosition.forEach((move: WeightedMove) => {
                move.object.move(new Set(move.move.split('')), deltaTime)
            })
            resolve()
        })
    }
}
