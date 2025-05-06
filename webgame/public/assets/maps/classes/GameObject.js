export class GameObject extends Object {
    constructor(x, y, width, height) {
      super();
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
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
  