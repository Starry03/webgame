import {Obj} from '../../../../src/internal/Obj'
import { AnimationType, Vector2 } from '../../../../src/internal/types';
import { AnimatedObject } from '../classes/AnimatedObject';

export class GameObject extends Obj {
    name: string
    x: number
    y: number
    width: number
    height: number
    constructor(canvas: HTMLCanvasElement, 
                ctx: CanvasRenderingContext2D, 
                initialAnimation: AnimationType, 
                isIdle: boolean,
                pos: Vector2,
                dim: Vector2,
                x: number,
                y: number,
                width: number,
                height: number) {
      super(canvas, ctx, initialAnimation, isIdle, pos, dim);
      pos = new Vector2(this.x,this.y);
      dim = new Vector2(this.width, this.height);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      }
  }
  