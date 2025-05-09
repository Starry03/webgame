import { AnimationType, Vector2 } from './types'

export class Obj {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  framePaths: Record<AnimationType, string[]>
  pos: Vector2
  dim: Vector2
  speed: number
  frames: Record<AnimationType, HTMLImageElement[]>
  selectedFrames: HTMLImageElement[] = []
  currentFrame
  lastUpdateTime
  facingDirection: Vector2
  currentAnimation: AnimationType
  prevAnimation: AnimationType | null
  isIdle: boolean
  ready: boolean
  cooldowns: Map<AnimationType, number>
  isAnimationBlocking: boolean
  isInteractable: boolean
  isSolid: boolean
  frameDelay: number = 1000 / 30
  collidedObjects: Obj[]

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    initialAnimation: AnimationType = AnimationType.IDLE,
    isIdle = false,
    pos: Vector2,
    dim: Vector2,
  ) {
    this.canvas = canvas
    this.ctx = ctx
    this.pos = pos
    this.dim = dim
    this.speed = 0
    this.frames = {} as Record<AnimationType, HTMLImageElement[]>
    this.framePaths = {} as Record<AnimationType, string[]>
    this.currentFrame = 0
    this.lastUpdateTime = performance.now()
    this.facingDirection = new Vector2(0, 1)
    this.currentAnimation = initialAnimation
    this.prevAnimation = null
    this.isIdle = isIdle
    this.ready = false
    this.cooldowns = new Map<AnimationType, number>()
    this.isAnimationBlocking = false
    this.isInteractable = false
    this.isSolid = true
    this.collidedObjects = []
  }

  preloadImages() {
    const promises: Promise<void>[] = []
    for (const animation in this.framePaths) {
      const animType = animation as AnimationType
      this.frames[animType as AnimationType] = []
      this.framePaths[animType].forEach((path: string) => {
        const img = new Image()
        const promise = new Promise<void>((resolve, reject) => {
          img.src = path
          img.onerror = () => {
            reject(`${path} failed to load`)
          }
          img.onload = () => {
            this.frames[animType].push(img)
            resolve()
          }
        })
        promises.push(promise)
      })
    }
    Promise.all(promises)
      .then(() => {
        this.ready = true
        this.idle()
      })
      .catch((error) => {
        console.error('Error loading images:', error)
        this.ready = true
        this.idle()
      })
  }

  changeFrames(animationName: AnimationType) {
    this.currentFrame = 0
    this.changeAnimation(animationName)
    this.selectedFrames = this.frames[animationName]
  }

  drawFlipped(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
    const ctx = this.ctx
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(image, -x - width, y, width, height)
    ctx.restore()
  }

  drawFrame() {
    const ctx = this.ctx
    if (this.selectedFrames.length === 0 || !this.selectedFrames[this.currentFrame]) {
      console.error('Frame non disponibile o non caricato correttamente.')
      return
    }
    const frame = this.selectedFrames[this.currentFrame] || this.selectedFrames[0]
    if (frame.complete) {
      ctx.save()
      if (this.facingDirection.x < 0)
        this.drawFlipped(frame, this.pos.x, this.pos.y, this.dim.x, this.dim.y)
      else ctx.drawImage(frame, this.pos.x, this.pos.y, this.dim.x, this.dim.y)
    }
    ctx.restore()
  }

  animate(timestamp: number) {
    if (timestamp - this.lastUpdateTime <= this.frameDelay) return
    this.currentFrame++
    this.lastUpdateTime = timestamp
    if (this.currentFrame >= this.selectedFrames.length) {
      this.currentFrame = 0
      this.isAnimationBlocking = false
      if (
        this.cooldowns.has(this.currentAnimation) &&
        this.cooldowns.get(this.currentAnimation) != 0
      ) {
        this.idle()
      }
    }
  }

  move(keyPressed: string | Set<string>, deltaTime: number) {}

  isAnimationChanged() {
    return this.prevAnimation !== this.currentAnimation
  }

  changeAnimation(
    animationName: AnimationType,
    isBlocking: boolean = false,
    prevAnimation: AnimationType | null = null,
  ) {
    if (prevAnimation) this.prevAnimation = prevAnimation
    else this.prevAnimation = this.currentAnimation
    if (animationName !== AnimationType.IDLE) this.isIdle = false
    this.currentAnimation = animationName
    if (isBlocking && !this.isAnimationBlocking) this.isAnimationBlocking = true
  }

  update(timestamp: number) {
    if (!this.ready) return
    if (this.isAnimationChanged() && !this.isIdle) {
      this.changeFrames(this.currentAnimation)
    }
    this.animate(timestamp)
    this.drawFrame()
  }

  idle(forced: boolean = false) {
    if (this.isIdle && !forced) return
    this.changeAnimation(AnimationType.IDLE)
    this.changeFrames(this.currentAnimation)
    this.isIdle = true
  }

  resetCollisions() {
    this.collidedObjects = []
  }

  onCollision(other: Obj, dir: Vector2) {
    if (this.isSolid && other.isSolid) {
      this.collidedObjects.push(other)
      this.handleCollision(dir)
    }
  }

  handleCollision(dir: Vector2) {}

  getFramePaths(): Record<AnimationType, string[]> {
    return this.framePaths;
  }

  setFramePaths(path: Record<AnimationType, string[]>) {
    this.framePaths = path;
  }
}
