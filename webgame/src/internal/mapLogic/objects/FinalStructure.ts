import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import {AnimationType, Vector2} from '@/internal/types.ts';
import {Ladder} from '@/internal/mapLogic/objects/Ladder';
import { SwitchRoomDoor } from '@/internal/mapLogic/objects/door/SwitchRoomDoor'

export class FinalStructure extends NotAnimatedObject {
    ladder: Ladder;
    switch_room_door: SwitchRoomDoor;

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
                ladder: Ladder,
                switch_room_door: SwitchRoomDoor) {
        super(canvas,ctx,initialAnimation,isIdle,pos,dim,name,x,y,width,height);
        this.ladder=ladder;
        this.switch_room_door = switch_room_door;
    }
}
