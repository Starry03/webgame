import { AnimationType, Vector2 } from '../../../types'
import { AnimatedObject } from '../../classes/AnimatedObject.ts'

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
    /*verificare se nelle sottoclassi va messa l'animazione contraria al nome stesso della classe*/
    setPaths(): void{
        const frame_paths: Record<AnimationType, string[]> = {
            run: [],
            attack1: [],
            attack2: [],
            special: [],
            idle: [
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/entrance_door.png',
            ],
            hurt: [],
            dead: [],
            opening: [
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura1.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura2.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura3.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/entrance_door.png',

            ],
            closing: [
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/entrance_door.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura3.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura2.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura1.png',
                '/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura.png',
            ],
        }
        this.setFramePaths(frame_paths)
    }
}
