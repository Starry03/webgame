import { AnimationType, Vector2 } from '@/internal/types.ts'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import type { CollisionInfo } from '@/internal/collision'

export class Door extends AnimatedObject {
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        initialAnimation: AnimationType,
        isIdle: boolean,
        pos: Vector2,
        dim: Vector2,
        name: string,
        x: number,
        y: number,
        width: number,
        height: number,
        custom_properties: Record<string, string>,
    ) {
        super(
            canvas,
            ctx,
            initialAnimation,
            isIdle,
            pos,
            dim,
            name,
            x,
            y,
            width,
            height,
            custom_properties,
        )
    }

    setPaths() {}

    enterCollision(collisionInfo: CollisionInfo): void {
        super.enterCollision(collisionInfo)
    }

    onInteraction(): void {
        if (this.isAnimationBlocking) return
        this.changeAnimation(AnimationType.OPENING, true, false)
        this.custom_properties['collidable'] = false
    }
}
