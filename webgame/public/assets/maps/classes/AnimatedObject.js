export class AnimatedObject extends Object {
    constructor({ name, x, y, width, height, frames = [], animationSpeed = 1, custom_properties}) {
      super();
      this.name = name;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.frames = frames;
      this.currentFrame = 0;
      this.animationSpeed = animationSpeed;
      this.frameTimer = 0;
      this.custom_properties = custom_properties;
    }
  
    update(deltaTime) {
      this.frameTimer += deltaTime;
      if (this.frameTimer >= this.animationSpeed) {
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        this.frameTimer = 0;
      }
    }
  
    render(ctx) {
      const frame = this.frames[this.currentFrame];
      if (frame && ctx) {
        ctx.drawImage(frame, this.x, this.y, this.width, this.height);
      }
    }
  }
  