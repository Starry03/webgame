import {Door} from "./Door";
import {AnimationType, Vector2} from "../../../../src/internal/types";

export class SwitchRoomDoor extends Door {
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

    setPaths(): Record<AnimationType, string[]> {
        const frame_paths: Record<AnimationType, string[]> = {
            run: [],
            attack1: [],
            attack2: [],
            special: [],
            idle: [],
            hurt: [],
            dead: [],
            opening: [],
            closing: [
                '../rooms/tiled_objects/apertura5.png',
                '../rooms/tiled_objects/apertura4.png',
                '../rooms/tiled_objects/apertura3.png',
                '../rooms/tiled_objects/apertura2.png',
                '../rooms/tiled_objects/apertura1.png',
                '../rooms/tiled_objects/entrance_door.png',
            ]
        };
        this.setFramePaths(frame_paths);
        return frame_paths;
    }
}
