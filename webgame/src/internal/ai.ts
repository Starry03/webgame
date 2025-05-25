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
    moveCombinations: string[] = ['', 'w', 'wa', 'wd', 'd', 'ds', 's', 'sa', 'a']
    keys = new Set<string>(['r', 'q', 'e'])
    scale = 3

    constructor(player: Entity, enemies: Entity[]) {
        this.player = player
        this.enemies = enemies
        this.update(0.02)
    }

    private reduceMove(pos: Vector2) {
        return new Vector2(Math.floor(pos.x / this.scale), Math.floor(pos.y / this.scale))
    }

    private expandMove(pos: Vector2) {
        return new Vector2(pos.x * this.scale, pos.y * this.scale)
    }

    private heuristic(pos: Vector2, dir: Vector2, a: Entity, goal: Entity): number {
        const newPos = this.expandMove(pos)
        if (!a.canMove(newPos, dir)) return 9999999999
        const goalReduced = this.reduceMove(goal.pos)
        const dx = goalReduced.x - pos.x
        const dy = goalReduced.y - pos.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    private goalTest(move: WeightedMove, target: Entity): boolean {
        const newPos = this.expandMove(move.position)
        return Collider.collides(newPos, move.object.dim, target.pos, target.dim)
    }

    async computeAstar(deltaTime: number, obj: Entity, target: Entity): Promise<string[]> {
        let maxiter: number = 500
        return new Promise<string[]>((resolve, reject) => {
            let frontier: WeightedMove[] = []
            let explored: Set<string> = new Set()
            this.moveCombinations.forEach((moveComb: string) => {
                const possible_move = obj.move(new Set(moveComb.split('')), deltaTime, true)
                if (!possible_move) return
                possible_move.possible_position = possible_move.possible_position.toRounded()
                const reducedPos = this.reduceMove(possible_move.possible_position)
                const { dir } = possible_move
                const g = 0
                const h = this.heuristic(reducedPos, dir, obj, target)
                const weight = g + h
                frontier.push({
                    object: obj,
                    position: reducedPos,
                    g: g,
                    h: h,
                    weight: weight,
                    move: moveComb,
                    prev: null,
                } as WeightedMove)
            })
            let solution: WeightedMove[] = []
            while (frontier.length > 0 && maxiter-- > 0) {
                frontier.sort((a: WeightedMove, b: WeightedMove) => a.weight - b.weight)
                const current = frontier.shift()
                if (!current) break
                const mappedPos = current.position.toString()
                if (explored.has(mappedPos)) continue
                explored.add(mappedPos)
                if (this.goalTest(current, target)) {
                    let node = current
                    while (node.prev) {
                        solution.push(node)
                        node = node.prev ?? ({} as WeightedMove)
                    }
                    solution.reverse()
                    resolve(solution.map((s: WeightedMove) => s.move))
                    return
                }
                this.moveCombinations.forEach((moveComb: string) => {
                    const possible_move = obj.move(
                        new Set(moveComb.split('')),
                        deltaTime,
                        true,
                        this.expandMove(current.position),
                    )
                    if (!possible_move) return
                    possible_move.possible_position = possible_move.possible_position.toRounded()
                    const reducedPos = this.reduceMove(possible_move.possible_position)
                    const { dir } = possible_move
                    const posKey = reducedPos.toString()
                    if (explored.has(posKey)) return
                    const g = current.g + 1
                    const h = this.heuristic(reducedPos, dir, obj, target)
                    const weight = g + h
                    const childNode = {
                        object: obj,
                        position: reducedPos,
                        g: g,
                        h: h,
                        weight: weight,
                        move: moveComb,
                        prev: current,
                    } as WeightedMove
                    const existingIndex = frontier.findIndex((f: WeightedMove) =>
                        f.position.compare(reducedPos.x, reducedPos.y),
                    )
                    if (existingIndex === -1) {
                        frontier.push(childNode)
                    } else if (frontier[existingIndex].weight > weight) {
                        frontier[existingIndex] = childNode // SOSTITUISCI TUTTO IL NODO
                    }
                })
            }
            reject(new Error(`No path found for ${obj.id} to target ${target.id}`))
        })
    }

    update(deltaTime: number) {
        if (this.player.isDead) return
        const playerPos = this.player.pos

        for (const enemy of this.enemies) {
            if (enemy.isDead) continue
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
                continue
            }
            if (
                enemy.speed !== 0 &&
                (enemy.target_position === null ||
                    !enemy.target_position?.compare(playerPos.x, playerPos.y))
            ) {
                if (!enemy.isComputingPath && enemy.canComputePath) {
                    enemy.isComputingPath = true
                    this.computeAstar(deltaTime, enemy, this.player)
                        .then((path: string[]) => {
                            enemy.movingPath = path
                            console.log(
                                `Computed path for ${enemy.id} to target ${this.player.id}: ${path.join(', ')}`,
                            )
                        })
                        .catch((error) => {
                            enemy.movingPath = [] as string[]
                            console.error('Error computing path')
                        })
                        .finally(() => {
                            enemy.currentMove = 0
                            enemy.isComputingPath = false
                            enemy.canComputePath = false
                            setTimeout(() => {
                                enemy.canComputePath = true
                            }, 2000)
                        })
                }
            }
        }
    }
}
