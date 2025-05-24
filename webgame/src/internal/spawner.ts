import { Collider } from './collision'
import { Entity } from './Entity'
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

    spawn(number: number) {
        for (let i = 0; i < number; i++) {
            const randomIndex = Math.floor(Math.random() * this.enemies.length)
            const enemy = this.enemies[randomIndex]
            const newEnemy = this.createEnemy(enemy)
            if (newEnemy === null) throw new Error('Enemy not found')
            newEnemy.setup()
            newEnemy.name = enemy.name
            this.findSpawnPosition(newEnemy as Entity)
                .then((spawPos: Vector2) => {
                    newEnemy.pos = spawPos
                    this.gameObjects.push(newEnemy)
                    console.debug('Spawned enemy:', newEnemy.name, newEnemy.pos)
                })
                .catch((error) => {
                    console.error('Error finding spawn position:', error)
                })
        }
    }

    private createEnemy(enemy: Character) {
        switch (enemy.name) {
            case 'plant':
                return new Plent(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defense,
                )
            case 'werewolf':
                return new Werewolf(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defense,
                )
            case 'archer_skeleton':
                return new Skele_arc(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defense,
                )
            case 'warrior_skeleton':
                return new Skele_war(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defense,
                )
            case 'spear_skeleton':
                return new Skele_spe(
                    this.canvas,
                    this.ctx,
                    enemy.speed,
                    enemy.hp,
                    enemy.mana,
                    enemy.attack,
                    enemy.defense,
                )
            default:
                return null
        }
    }

    private async findSpawnPosition(enemy: Entity): Promise<Vector2> {
        let spawnPos: Vector2 | null = null
        while (spawnPos === null) {
            const x = Math.floor(Math.random() * this.canvas.width)
            const y = Math.floor(Math.random() * this.canvas.height)
            const attempt = new Vector2(x, y)

            this.gameObjects.forEach((obj: Obj) => {
                if (obj.id === enemy.id) return
                if (!obj.custom_properties['collidable']) return
                if (!Collider.collides(attempt, enemy.dim, obj.pos, obj.dim, 0)) {
                    spawnPos = attempt
                    return
                }
            })
        }
        return spawnPos;
    }
}
