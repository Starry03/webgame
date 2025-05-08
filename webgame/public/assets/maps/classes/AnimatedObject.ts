import { GameObject } from "./GameObject";
import { AnimationType, Vector2 } from '../../../../src/internal/types';

export class AnimatedObject extends GameObject {
    custom_properties: Record<string,string> = {}
    constructor({name, x, y, width, height, custom_properties}) {
      super(name, x, y, width, height);
      this.custom_properties = custom_properties;
    }
  
  }
  