import {AnimationType, Vector2} from "@/internal/types.ts";
import {Door} from '@/internal/mapLogic/objects/door/Door'

export class EntranceDoor extends Door {
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
            idle: ['/assets/maps/rooms/tiled_objects/switchRoomDoors/entrance_door.png',],
            hurt: [],
            dead: [],
            opening: [
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/entrance_door.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura3.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura2.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura1.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura.png',
            ],
            closing: [
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura1.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura2.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura3.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/entrance_door.png',
            ]
        }
        this.setFramePaths(frame_paths)
    }
}
