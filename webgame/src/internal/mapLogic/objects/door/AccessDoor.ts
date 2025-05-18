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

    setPaths() {
        const frame_paths: Record<AnimationType, string[]> = {
            run: [],
            attack1: [],
            attack2: [],
            special: [],
            idle: ['/assets/maps/rooms/tiled_objects/finalDoor/second_final_door1.png'],
            hurt: [],
            dead: [],
            opening: [
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door1.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door2.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door3.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door4.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door5.png'
            ],
            closing: [
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door5.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door4.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door3.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door2.png',
                '/assets/maps/rooms/tiled_objects/finalDoor/second_final_door1.png'
            ]
        }
        this.setFramePaths(frame_paths);
    }
}
