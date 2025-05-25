import { Collider, type CollisionInfo } from './collision'
import type { Entity } from './Entity'
import type { Obj } from './Obj'
import { Vector2 } from './types'

type WeightedMove = {
    object: Entity
    position: Vector2
    g: number
    h: number
    weight: number
    move: string
    prev: WeightedMove | null
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

    private heuristic(pos: Vector2, dir: Vector2, a: Entity, goal: Entity): number {
        if (!a.canMove(pos, dir)) {
            console.debug('works')
            return 9999999999
        }
        const dx = goal.pos.x - pos.x
        const dy = goal.pos.y - pos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        return dist
    }

    private goalTest(obj: Entity, target: Entity): boolean {
        return (
            Array.from(obj.collidedObjects).filter(
                (other: CollisionInfo) => other.other.id === target.id,
            ).length > 0
        )
    }

    async computeAstar(deltaTime: number, obj: Entity, target: Entity): Promise<void> {
        let frontier: WeightedMove[] = this.moveCombinations.map((moveComb: string) => {
            const possible_move = obj.move(new Set(moveComb.split('')), deltaTime, true)
            if (!possible_move) return {} as WeightedMove
            const { possible_position, dir } = possible_move
            const g = 0
            const h = this.heuristic(possible_position, dir, obj, target)
            const weight = g + h
            return {
                object: obj,
                position: possible_position,
                g: g,
                h: h,
                weight: weight,
                move: moveComb,
                prev: null,
            } as WeightedMove
        })
        let solution: WeightedMove[] = []
        while (frontier.length > 0) {
            frontier.sort((a: WeightedMove, b: WeightedMove) => a.weight - b.weight)
            const current = frontier.shift()
            frontier = frontier.slice(1)
            if (!current) continue
            if (this.goalTest(current.object, target)) {
                // build solution
                solution.push(current)
                let prev = current.prev
                while (prev) {
                    solution.push(prev)
                    prev = prev.prev
                }
                solution.reverse()
                obj.movingPath = solution.map((move: WeightedMove) => move.move)
                return
            }
            this.moveCombinations.forEach((moveComb: string) => {
                const possible_move = obj.move(new Set(moveComb.split('')), deltaTime, true)
                if (!possible_move) return {} as WeightedMove
                const { possible_position, dir } = possible_move
                const g = current.weight + dir.magnitude() * deltaTime * obj.speed * 4
                const h = this.heuristic(possible_position, dir, obj, target)
                const weight = g + h
                const childNode = {
                    object: obj,
                    position: possible_position,
                    g: g,
                    h: h,
                    weight: weight,
                    move: moveComb,
                    prev: null,
                } as WeightedMove
            })
        }
    }

    async update(deltaTime: number) {
        let promises: Promise<WeightedMove[]>[] = []
        if (this.player.isDead) return
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
                return
            }
        })
    }
}
