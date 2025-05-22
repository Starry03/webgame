import {AnimatedObject} from '@/internal/mapLogic/classes/AnimatedObject.ts'
import {AnimationType, Vector2} from '@/internal/types.ts'

export class SpecialWall extends AnimatedObject {
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
                height: number,
                custom_properties: Record<string,string>) {
        super(canvas, ctx, initialAnimation, isIdle, pos, dim, name, x, y, width, height, custom_properties);
    }

    setPaths() {
        const frame_paths: Record<AnimationType, string[]> = {
            run: [],
            attack1: [],
            attack2: [],
            special: [],
            idle: ["/assets/maps/rooms/tiled_objects/wall.png"],
            hurt: [],
            dead: [],
            opening: ["/assets/maps/rooms/tiled_objects/wall.png"],
            closing: [],
        }
        this.setFramePaths(frame_paths)
    }
}
