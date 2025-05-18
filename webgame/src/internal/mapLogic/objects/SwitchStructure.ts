import {NotAnimatedObject} from '../classes/NotAnimatedObject';
import {AnimatedObject} from '@/internal/mapLogic/classes/AnimatedObject.ts'
import {AnimationType, Vector2} from '@/internal/types.ts';
import {SpecialWall} from '@/internal/mapLogic/objects/SpecialWall.ts'
import {SwitchRoomDoor} from './door/SwitchRoomDoor.ts';

export class SwitchStructure extends NotAnimatedObject {
    special_wall:  SpecialWall;
    switch_room_door:  SwitchRoomDoor;
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
                special_wall:  SpecialWall,
                switch_room_door:  SwitchRoomDoor) {
        super(canvas,ctx,initialAnimation,isIdle,pos,dim,name,x,y,width,height);
        this.special_wall = special_wall;
        this.switch_room_door = switch_room_door;
    }

    static getSpecialWall (list_objects: (NotAnimatedObject|AnimatedObject)[]): SpecialWall|undefined {
        try {
            for (const obj of list_objects) {
                if (obj instanceof SpecialWall) {
                    return obj;
                }
            }
        }
        catch(e) {
            throw new Error("special wall not found for room3")
        }

    }
}
