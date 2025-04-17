import { AnimationType, Vector2 } from './types'

export class Obj {
  canvas
  ctx
  framePaths
  pos: Vector2
  xPos
  yPos
  speed
  frames
  currentFrame
  frameDelay
  lastUpdateTime
  facingDirection: Vector2
  currentAnimation: AnimationType
  prevAnimation: AnimationType | null

  constructor(
    canvas,
    ctx,
    xPos = 50,
    yPos = 50,
    speed = 3,
    initialAnimation: AnimationType = AnimationType.IDLE,
    frameDelay = 100,
  ) {
    this.canvas = canvas
    this.ctx = ctx
    this.pos = new Vector2(50, 50)
    this.xPos = xPos
    this.yPos = yPos
    this.speed = speed
    this.frames = []
    this.currentFrame = 0
    this.frameDelay = frameDelay
    this.lastUpdateTime = performance.now()
    this.facingDirection = new Vector2(0, 1)
    this.currentAnimation = initialAnimation
    this.prevAnimation = null
  }

  loadFrames(animationName: string) {
    this.frames = []
    this.currentFrame = 0
    if (!this.framePaths[animationName]) {
      console.error(`Animazione ${animationName} non trovata.`)
      return
    }
    this.framePaths[animationName].forEach((path) => {
      const img = new Image()
      img.src = path
      img.onerror = () => console.error(`Errore nel caricamento dell'immagine: ${path}`)
      this.frames.push(img)
    })
  }

  drawFrame() {
    const ctx = this.ctx
    if (this.frames.length === 0 || !this.frames[this.currentFrame]) {
      console.error('Frame non disponibile o non caricato correttamente.')
      return
    }
    const frame = this.frames[this.currentFrame]
    if (frame.complete) {
      ctx.save()
      if (this.facingDirection.x < 0) {
        ctx.translate(this.pos.x + 100, this.yPos)
        ctx.scale(-1, 1)
        ctx.drawImage(frame, 0, 0, 100, 100)
      } else {
        ctx.drawImage(frame, this.pos.x, this.pos.y, 100, 100)
      }
      ctx.restore()
    }
  }

  animate(timestamp) {
    if (timestamp - this.lastUpdateTime <= this.frameDelay) return
    this.currentFrame++
    console.log('Current frame:', this.currentFrame)
    if (this.currentFrame >= this.frames.length) this.currentFrame = 0
    this.lastUpdateTime = timestamp
  }

  move(keyPressed: any) {
    console.log('Metodo move() generico: implementa il movimento specifico nelle classi derivate.')
  }

  isAnimationChanged() {
    return this.prevAnimation !== this.currentAnimation
  }

  changeAnimation(animationName: AnimationType) {
    this.prevAnimation = this.currentAnimation
    this.currentAnimation = animationName
  }

  update(timestamp) {
    this.animate(timestamp)
    if (this.isAnimationChanged()) this.loadFrames(this.currentAnimation)
    this.drawFrame()
  }
}
