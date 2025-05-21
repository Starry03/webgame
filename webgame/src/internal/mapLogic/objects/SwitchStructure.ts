import { AnimatedObject } from '../classes/AnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
import { SpecialWall } from '@/internal/mapLogic/objects/SpecialWall.ts'
import type { TiledObject } from '@/internal/mapLogic/engine/interfaces/Interfaces.ts'
import { extractCustomProperties } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'
import { SwitchRoomDoor } from '@/internal/mapLogic/objects/door/SwitchRoomDoor.ts'

export class SwitchStructure extends AnimatedObject {
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

    static populateCustomProperties(
        custom_properties: Record<string, any>,
        objects: TiledObject[],
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): void {
        for (const object of objects) {
            if (object.name === 'specialWall') {
                const custom_properties_special_wall: Record<string, any> =
                    extractCustomProperties(object)
                const special_wall: SpecialWall = new SpecialWall(
                    canvas,
                    ctx,
                    AnimationType.IDLE,
                    true,
                    new Vector2(object.x, object.y),
                    new Vector2(object.width, object.height),
                    object.name,
                    object.x,
                    object.y,
                    object.width,
                    object.height,
                    custom_properties_special_wall,
                )
                custom_properties['specialWall'] = special_wall
            }

            if (object.name == 'switchRoomDoor') {
                const custom_properties_door: Record<string, any> = extractCustomProperties(object)
                const switch_room_door: SwitchRoomDoor = new SwitchRoomDoor(
                    canvas,
                    ctx,
                    AnimationType.IDLE,
                    true,
                    new Vector2(object.x, object.y),
                    new Vector2(object.width, object.height),
                    object.name,
                    object.x,
                    object.y,
                    object.width,
                    object.height,
                    custom_properties_door)
                custom_properties['specialWall'] = switch_room_door
            }
        }
    }
}
