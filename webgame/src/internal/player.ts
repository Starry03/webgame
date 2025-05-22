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
        pos: Vector2 = new Vector2(50, 50),
        dim: Vector2 = new Vector2(48, 48),
    ) {
        super(canvas, ctx, speed, health, mana, attackPower, defense, pos, dim)
        this.interactionMessage = interactionMessage ?? ''
    }

    interact(other: Obj): void {
        other.onInteraction()
    }

    enterInteraction(collision: CollisionInfo): void {
        this.interactionMessage =
            "Press 'E to interact with " + collision.other.name
        super.enterInteraction(collision)
    }

    exitInteraction(collision: CollisionInfo): void {
        this.interactionMessage = ''
        super.exitInteraction(collision)
    }
}
