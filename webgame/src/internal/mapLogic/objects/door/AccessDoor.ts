import {Door} from './Door'
import {AnimationType, Vector2} from "../../../types.ts";

export class AccessDoor extends Door {
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
        super(canvas, ctx, initialAnimation, isIdle, pos, dim, name, x, y, width, height, custom_properties);
    }
}
