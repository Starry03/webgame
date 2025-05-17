import {Obj} from '../../../../src/internal/Obj'
import { AnimationType, Vector2 } from '../../../../src/internal/types';

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
                name: string,
                x: number,
                y: number,
                width: number,
                height: number) {
      super(canvas, ctx, initialAnimation, isIdle, new Vector2(x, y), new Vector2(x, y));
      this.name = name;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      }
  }
