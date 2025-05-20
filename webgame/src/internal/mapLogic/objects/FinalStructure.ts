import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
import { Ladder } from '@/internal/mapLogic/objects/Ladder'
import { AccessDoor } from '@/internal/mapLogic/objects/door/AccessDoor'
import type { TiledObject } from '@/internal/mapLogic/engine/interfaces/Interfaces.ts'
import {extractCustomProperties} from "@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts";

export class FinalStructure extends AnimatedObject {
    ladder: Ladder
    access_door: AccessDoor

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
        ladder: Ladder,
        access_door: AccessDoor,
    ) {
        super(canvas, ctx, initialAnimation, isIdle, pos, dim, name, x, y, width, height, custom_properties)
        this.ladder = ladder
        this.access_door = access_door
    }

    static getLadder(
        layer_objects: TiledObject[],
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): Ladder {
        console.log("getLadder")
        console.log("<----------------------------------------------")
        for (const obj of layer_objects) {
            console.log(obj.name)
            if (obj.name === 'ladder') {
                obj.y = obj.y - obj.height
                const isIdle: boolean = true
                console.log("ladder trovata")
                return new Ladder(
                    canvas,
                    ctx,
                    AnimationType.IDLE,
                    isIdle,
                    new Vector2(obj.x, obj.y),
                    new Vector2(obj.width, obj.height),
                    obj.name,
                    obj.x,
                    obj.y,
                    obj.width,
                    obj.height,
                )
            }
        }
        console.log("ladder non trovata")
        console.log("----------------------------------------------------------->")
        return new Ladder(
            canvas,
            ctx,
            AnimationType.IDLE,
            true,
            new Vector2(0, 0),
            new Vector2(0, 0),
            '',
            0,
            0,
            0,
            0,
        )
    }

    static getAccessDoor(
        layer_objects: TiledObject[],
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): AccessDoor {
        console.log("getAccessDoor")
        console.log("<-----------------------------------------------------")
        for (const obj of layer_objects) {
            console.log(obj.name)
            if (obj.name === 'accessDoor') {
                console.log("access_door trovata")
                obj.y = obj.y - obj.height
                const custom_properties: Record<string, any> = extractCustomProperties(obj)
                const isIdle: boolean = true
                const access_door = new AccessDoor(
                    canvas,
                    ctx,
                    AnimationType.IDLE,
                    isIdle,
                    new Vector2(obj.x, obj.y),
                    new Vector2(obj.width, obj.height),
                    obj.name,
                    obj.x,
                    obj.y,
                    obj.width,
                    obj.height,
                    custom_properties,
                )
                access_door.setPaths()
                return access_door
            }
        }
        console.log("access_door non trovata")
        console.log("---------------------------------------------------------------------->")
        return new AccessDoor(canvas, ctx, AnimationType.IDLE, true, new Vector2(0,0), new Vector2(0,0), '', 0,0,0,0, {});
    }
}
