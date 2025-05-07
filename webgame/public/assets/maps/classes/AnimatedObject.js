export class AnimatedObject extends GameObject {
    constructor({ name, x, y, width, height, frames, speed, custom_properties, interactable = true}) {
      super(name, x, y, width, height, frames, speed, interactable);
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
  