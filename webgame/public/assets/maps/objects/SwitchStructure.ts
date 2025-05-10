import {NotAnimatedObject} from '../classes/NotAnimatedObject';
import { AnimationType, Vector2 } from '../../../../src/internal/types';
import {SpecialWall} from './SpecialWall'
import {SwitchRoomDoor} from './SwitchRoomDoor';

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
}
