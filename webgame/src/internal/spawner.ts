import { Collider } from './collision'
import { Entity } from './Entity'
import type { GameHandler } from './GameHandler'
import type { Obj } from './Obj'
import { Plent } from './Plent'
import { Skele_arc } from './Skele_arc'
import { Skele_spe } from './Skele_spe'
import { Skele_war } from './Skele_war'
import type { Character } from './types'
import { Vector2 } from './types'
import { Werewolf } from './Werewolf'

export class Spawner {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    gameObjects: Obj[]
    enemies: Character[]
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        gameObjects: Obj[],
        enemies: Character[],
    ) {
        this.canvas = canvas
        this.ctx = ctx
        this.gameObjects = gameObjects
        this.enemies = enemies
        console.debug(
            'Spawner initialized with enemies:',
            this.enemies.map((e) => e.name),
        )
    }

    async spawn(number: number, gameHandler: GameHandler) {
        for (let i = 0; i < number; i++) {
            new Promise(() => {
                const randomIndex = Math.floor(Math.random() * this.enemies.length)
                const enemy = this.enemies[randomIndex]
                const newEnemy = this.createEnemy(enemy)
                if (newEnemy === null) throw new Error('Enemy not found')
                newEnemy.setup()
                newEnemy.name = enemy.name
                newEnemy.setGameHandler(gameHandler)
                this.findSpawnPosition(newEnemy as Entity)
                    .then((spawPos: Vector2) => {
                        newEnemy.pos = spawPos
                        this.gameObjects.push(newEnemy)
                        console.debug('Spawned enemy:', newEnemy.name, newEnemy.pos)
                    })
                    .catch((error) => {
                        console.error('Error finding spawn position:', error)
                    })
            })
        }
    }

    createEnemy(enemy: Character): Entity | null {
        switch (enemy.name) {
            case 'plant':
                return new Plent(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defence,
                )
            case 'werewolf':
                return new Werewolf(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defence,
                )
            case 'archer_skeleton':
                return new Skele_arc(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defence,
                )
            case 'warrior_skeleton':
                return new Skele_war(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defence,
                )
            case 'spear_skeleton':
                return new Skele_spe(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defence,
                )
            default:
                return null
        }
    }

    async findSpawnPosition(enemy: Entity): Promise<Vector2> {
        let spawnPos: Vector2 | null = null
        let attempt: Vector2 | null = null
        while (attempt === null) {
            const x = Math.floor(Math.random() * this.canvas.width)
            const y = Math.floor(Math.random() * this.canvas.height)
            attempt = new Vector2(x, y)
            this.gameObjects.forEach((obj: Obj) => {
                if (attempt === null) return
                if (obj.id === enemy.id) return
                if (!obj.custom_properties['collidable']) return
                if (Collider.collides(attempt as Vector2, enemy.dim, obj.pos, obj.dim, 0)) {
                    attempt = null
                    return
                }
            })
            if (attempt === null) continue
            spawnPos = attempt
        }
        return spawnPos as Vector2
    }
}
