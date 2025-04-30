import { AnimationType, Vector2 } from './types'

export class Obj {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  framePaths: Record<AnimationType, string[]>
  pos: Vector2
  dim: Vector2
  xPos
  yPos
  speed: number
  frames: Record<AnimationType, HTMLImageElement[]>
  selectedFrames: HTMLImageElement[] = []
  currentFrame
  frameDelay
  lastUpdateTime
  facingDirection: Vector2
  currentAnimation: AnimationType
  prevAnimation: AnimationType | null
  isIdle: boolean
  ready: boolean
  canAttack: boolean
  cooldowns: Map<AnimationType, number>

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    xPos = 50,
    yPos = 50,
    initialAnimation: AnimationType = AnimationType.IDLE,
    frameDelay = 100,
    isIdle = false,
  ) {
    this.canvas = canvas
    this.ctx = ctx
    this.pos = new Vector2(50, 50)
    this.dim = new Vector2(100, 100)
    this.xPos = xPos
    this.yPos = yPos
    this.speed = 0
    this.frames = {} as Record<AnimationType, HTMLImageElement[]>
    this.framePaths = {} as Record<AnimationType, string[]>
    this.currentFrame = 0
    this.frameDelay = frameDelay
    this.lastUpdateTime = performance.now()
    this.facingDirection = new Vector2(0, 1)
    this.currentAnimation = initialAnimation
    this.prevAnimation = null
    this.isIdle = isIdle
    this.ready = false
    this.canAttack = true
    this.cooldowns = new Map<AnimationType, number>()
  }

  preloadImages() {
    for (const animation in this.framePaths) {
      const animType = animation as AnimationType
      this.frames[animType as AnimationType] = []
      this.framePaths[animType].forEach((path: string) => {
        const img = new Image()
        img.src = path
        img.onerror = () => console.error(`Errore nel caricamento dell'immagine: ${path}`)
        img.onload = () => {
          this.frames[animType].push(img)
        }
      })
    }
    this.changeFrames(this.currentAnimation)
    this.ready = true
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

  animate(timestamp) {
    if (timestamp - this.lastUpdateTime <= this.frameDelay) return
    this.currentFrame++
    if (this.currentFrame >= this.selectedFrames.length) {
      this.currentFrame = 0
      if (
        this.currentAnimation in
        [AnimationType.ATTACK_1, AnimationType.ATTACK_2, AnimationType.SPECIAL]
      ) {
        this.idle()
        console.log(this.cooldowns)
      }
    }
    this.lastUpdateTime = timestamp
  }

  move(keyPressed: string | Set<string>, deltaTime: number) {}

  isAnimationChanged() {
    return this.prevAnimation !== this.currentAnimation
  }

  changeAnimation(animationName: AnimationType, prevAnimation: AnimationType | null = null) {
    if (prevAnimation) this.prevAnimation = prevAnimation
    else this.prevAnimation = this.currentAnimation
    if (animationName !== AnimationType.IDLE) this.isIdle = false
    this.currentAnimation = animationName
  }

  update(timestamp) {
    if (!this.ready) return
    if (this.isAnimationChanged() && !this.isIdle) this.changeFrames(this.currentAnimation)
    this.animate(timestamp)
    this.drawFrame()
  }

  idle() {
    this.changeAnimation(AnimationType.IDLE)
    this.changeFrames(this.currentAnimation)
    this.isIdle = true
  }
}
