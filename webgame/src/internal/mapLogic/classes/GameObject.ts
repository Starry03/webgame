import { Obj } from '../../Obj'
import { AnimationType, Vector2 } from '../../types'

export class GameObject extends Obj {
    name: string
    x: number
    y: number
    width: number
    height: number
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
            new Vector2(x, y),
            new Vector2(width, height),
            custom_properties,
        )
        this.name = name
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}
