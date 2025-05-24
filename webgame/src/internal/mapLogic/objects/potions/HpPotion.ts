import type { Entity } from '@/internal/Entity'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
export class HpPotion extends AnimatedObject {
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

    onInteraction(): void {
        if (this.gameHandler && this.gameHandler.player) {
            this.gameHandler.player.health += 200
            this.custom_properties['takeable'] = false
            console.log(this.custom_properties)
            this.changeAnimation(AnimationType.DEAD, true, false)
        }
    }
}
