import { AnimationType, Vector2 } from '../../../../src/internal/types';
import { AnimatedObject } from '../classes/AnimatedObject';

export class Door extends AnimatedObject {
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
                custom_properties: Record<string,string>) {
      super(canvas, ctx, initialAnimation, isIdle, pos, dim, name, x, y, width, height, custom_properties);
    }
/*verificare se nelle sottoclassi va messa l'animazione contraria al nome stesso della classe*/
    setPaths(): Record<AnimationType, string[]> {
      const frame_paths: Record<AnimationType, string[]> = {
        run: [],
        attack1: [],
        attack2: [],
        special: [],
        idle: [],
        hurt: [],
        dead: [],
        opening: [
          '../rooms/tiled_objects/apertura.png',
          '../rooms/tiled_objects/apertura1.png',
          '../rooms/tiled_objects/apertura2.png',
          '../rooms/tiled_objects/apertura3.png',
          '../rooms/tiled_objects/apertura4.png',
          '../rooms/tiled_objects/entrance_door.png'
        ],
        closing: [
          '../rooms/tiled_objects/entrance_door.png',
          '../rooms/tiled_objects/apertura4.png',
          '../rooms/tiled_objects/apertura3.png',
          '../rooms/tiled_objects/apertura2.png',
          '../rooms/tiled_objects/apertura1.png',
          '../rooms/tiled_objects/entrance_door.png',
        ]
      };
      this.setFramePaths(frame_paths);
      return frame_paths;
    }
}
