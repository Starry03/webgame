import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
import { Ladder } from '@/internal/mapLogic/objects/Ladder'
import { AccessDoor } from '@/internal/mapLogic/objects/door/AccessDoor'
import type { TiledObject } from '@/internal/mapLogic/engine/interfaces/Interfaces.ts'
import { extractCustomProperties } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'

export class FinalStructure extends AnimatedObject {

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
        custom_properties: Record<string, any>) {
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
        ctx: CanvasRenderingContext2D): void {
        for (const object of objects) {
            if (object.name === 'accessDoor') {
                console.log("ho trovato l'accessDoor")
                object.y -= object.height
                const custom_properties_access_door: Record<string, any> =
                    extractCustomProperties(object)
                const access_door: AccessDoor = new AccessDoor(
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
                    custom_properties_access_door,
                )
                access_door.setPaths()
                custom_properties['accessDoor'] = access_door
            }

            if (object.name === 'ladder') {
                console.log("ho trovato ladder")
                object.y = object.y - object.height
                const custom_properties_ladder: Record<string, any> = extractCustomProperties(object)
                const ladder: Ladder = new Ladder(canvas, ctx, AnimationType.IDLE, true, new Vector2(object.x, object.y), new Vector2(object.width, object.height), object.name, object.x, object.y, object.width, object.height, custom_properties_ladder);
                custom_properties['ladder'] = ladder
            }
        }
    }
}
