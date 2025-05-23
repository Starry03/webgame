import type { CollisionInfo } from '@/internal/collision'
import { Door } from '@/internal/mapLogic/objects/door/Door.ts'
import { AnimationType, Vector2 } from '@/internal/types.ts'

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
            idle: ['/assets/maps/rooms/tiled_objects/switchRoomDoors/apertura.png'],
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

    onInteraction(): void {
        if (this.isAnimationBlocking) return
        if (this.gameHandler && this.custom_properties['collidable'] === false) {
            this.gameHandler.changeRoom(this.gameHandler.currentRoom + 1)
            console.debug('switch')
        }
        super.onInteraction()
    }
}
