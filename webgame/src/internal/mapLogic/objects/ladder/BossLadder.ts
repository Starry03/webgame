import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject.ts'
import { AnimationType, Vector2 } from '@/internal/types.ts'

export class BossLadder extends AnimatedObject {
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
        custom_properties: Record<string, any>,
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
            this.gameHandler.player.pos = this.pos;
        }
        this.gameHandler?.changeRoom(this.gameHandler.currentRoom + 1)
    }
}
