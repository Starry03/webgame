import {Obj} from '../../../../src/internal/Obj'

export class GameObject extends Obj {
    constructor(x, y, width, height, properties = {}, interactable) {
      super(x,y,width,height,properties, interactable);

    }
  
    get position() {
        return {
            x: this.x,
            y: this.y
        };
    }
  
    hasProperty(name) {
      return this.properties.hasOwnProperty(name);
    }
  }
  