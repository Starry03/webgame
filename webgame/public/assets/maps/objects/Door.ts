import {Obj} from '../../../../src/internal/Obj'
import { AnimationType, Vector2 } from '../../../../src/internal/types';

export class Door extends Obj {
    x: number
    y: number
    width: number
    height: number
    pos: Vector2
    dim: Vector2
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, speed: number, initialAnimation: AnimationType, isIdle: boolean) {
       this.pos = new Vector2(this.x,this.y)
       super(canvas,ctx,initialAnimation, isIdle,); 
    }
}