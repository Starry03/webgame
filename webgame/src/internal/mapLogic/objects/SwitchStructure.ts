import { NotAnimatedObject } from '../classes/NotAnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
import { SpecialWall } from '@/internal/mapLogic/objects/SpecialWall.ts'
import { SwitchRoomDoor } from './door/SwitchRoomDoor.ts'
import type { TiledObject } from '@/internal/mapLogic/engine/interfaces/Interfaces.ts'
import {extractCustomProperties} from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts';

export class SwitchStructure extends NotAnimatedObject {
    special_wall: SpecialWall
    switch_room_door: SwitchRoomDoor
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
        special_wall: SpecialWall,
        switch_room_door: SwitchRoomDoor,
    ) {
        super(canvas, ctx, initialAnimation, isIdle, pos, dim, name, x, y, width, height)
        this.special_wall = special_wall
        this.switch_room_door = switch_room_door
    }

    static getSpecialWall(
        layer_objects: TiledObject[],
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): SpecialWall {
        for (const obj of layer_objects) {
            if (obj.name == 'specialWall') {
                obj.y = obj.y - obj.height;
                const custom_properties: Record<string, string> = extractCustomProperties(obj)
                const isIdle: boolean = true
                return new SpecialWall(
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
            }
        }
        return new SpecialWall(canvas, ctx, AnimationType.IDLE, true, new Vector2(0,0), new Vector2(0,0),'',0,0,0,0, {});
    }

    static getSwitchRoomDoor(
        layer_objects: TiledObject[],
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): SwitchRoomDoor {
        for (const obj of layer_objects) {
            if (obj.name == 'switchRoomDoor') {
                obj.y = obj.y - obj.height;
                const custom_properties: Record<string, string> = extractCustomProperties(obj)
                const isIdle: boolean = true
                return new SwitchRoomDoor(
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
            }
        }
        return new SwitchRoomDoor(
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
            {},
        )
    }
}
