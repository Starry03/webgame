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
        pos: Vector2 = new Vector2(350, 200),
        dim: Vector2 = new Vector2(48, 48),
    ) {
        super(canvas, ctx, speed, health, mana, attackPower, defense, pos, dim)
        this.interactionMessage = interactionMessage ?? ''
        document.addEventListener('keyup', (event) => {
            if (event.key === ' ') {
                const closestObj: Obj | null = this.getClosestInteractableObj()
                if (closestObj) this.interact(closestObj)
            }
        })
    }

    getClosestInteractableObj(): Obj | null {
        if (this.interactedObjects.size === 0) return null
        const objs = Array.from(this.interactedObjects).map((collision) => collision.other)
        let closest = null
        let closestDistance = Infinity
        for (const obj of objs) {
            if (closest === null) {
                closest = obj
                continue
            }
            if (closestDistance > this.getDistance(obj)) {
                closestDistance = this.getDistance(obj)
                closest = obj
            }
        }
        return closest
    }

    interact(other: Obj): void {
        other.onInteraction()
    }

    enterCollision(collision: CollisionInfo): void {
        super.enterCollision(collision)
    }

    enterInteraction(collision: CollisionInfo): void {
        const closestObj = this.getClosestInteractableObj()
        if (closestObj) {
            this.interactionMessage = "'P' to interact with " + closestObj.name
        }
        super.enterInteraction(collision)
    }

    exitInteraction(collision: CollisionInfo): void {
        if (this.interactedObjects.size > 1) {
            const closestObj = this.getClosestInteractableObj()
            if (closestObj) {
                this.interactionMessage = "'space' to interact with " + closestObj.name
            } else this.interactionMessage = ''
        }
        super.exitInteraction(collision)
    }
}
