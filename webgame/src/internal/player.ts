import { type Ref, ref } from 'vue'
import { Entity } from './Entity'
import type { Obj } from './Obj'
import { Vector2 } from './types'
import type { CollisionInfo } from './collision'

export class Player extends Entity {
    interactionMessage: string

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        speed: number,
        health: number,
        mana: number,
        attackPower: number,
        defense: number,
        interactionMessage?: string,
        pos: Vector2 = new Vector2(200, 200),
        dim: Vector2 = new Vector2(48, 48),
    ) {
        super(canvas, ctx, speed, health, mana, attackPower, defense, pos, dim)
        this.interactionMessage = interactionMessage ?? ''
        document.addEventListener('keydown', (event) => {
            if (event.key === 'p') {
                this.interactedObjects.forEach((collision) => {
                    collision.other.onInteraction()
                })
            }
        })
    }

    interact(other: Obj): void {
        other.onInteraction()
    }

    enterInteraction(collision: CollisionInfo): void {
        this.interactionMessage = "'P' to interact with " + collision.other.name
        super.enterInteraction(collision)
    }

    exitInteraction(collision: CollisionInfo): void {
        this.interactionMessage = ''
        super.exitInteraction(collision)
    }
}
