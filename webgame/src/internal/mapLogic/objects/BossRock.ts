import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import {AnimationType, Vector2} from '@/internal/types.ts';

export class BossRock extends NotAnimatedObject {
    constructor(canvas: HTMLCanvasElement,
                ctx: CanvasRenderingContext2D,
                initialAnimation: AnimationType,
                isIdle: boolean,
                pos: Vector2,
                dim: Vector2,
                name: string,
                x: number,
                y: number,
                width: number,
                height: number) {
        super(canvas, ctx, initialAnimation, isIdle, pos, dim, name, x, y, width, height);
    }
}
