import {GameObject} from './GameObject';
import { AnimationType, Vector2 } from '../../types';

export class NotAnimatedObject extends GameObject {
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
                    height: number) {
        super(canvas,ctx,initialAnimation,isIdle,pos,dim,name,x,y,width,height)
        }

}
