export class Obj {
  canvas
  ctx
  framePaths
  xPos
  yPos
  speed
  currentAnimation
  frames
  currentFrame
  frameDelay
  lastUpdateTime
  facingDirection
  animationInProgress
  animationChanged

  constructor(
    canvas,
    ctx,
    xPos = 50,
    yPos = 50,
    speed = 3,
    initialAnimation = 'idle',
    frameDelay = 100,
  ) {
    this.canvas = canvas
    this.ctx = ctx
    this.xPos = xPos
    this.yPos = yPos
    this.speed = speed
    this.currentAnimation = initialAnimation
    this.frames = []
    this.currentFrame = 0
    this.frameDelay = frameDelay
    this.lastUpdateTime = performance.now()
    this.facingDirection = 'right'
    this.animationInProgress = false
    this.animationChanged = false
  }

  // Carica i frame dell'animazione richiesta
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

  // Disegna il frame corrente sul canvas
  drawFrame() {
    const ctx = this.ctx
    if (this.frames.length === 0 || !this.frames[this.currentFrame]) {
      console.error('Frame non disponibile o non caricato correttamente.')
      return
    }
    const frame = this.frames[this.currentFrame]
    if (frame.complete) {
      ctx.save()
      if (this.facingDirection === 'left') {
        ctx.translate(this.xPos + 100, this.yPos) // Sposta l'origine per il flip
        ctx.scale(-1, 1)
        ctx.drawImage(frame, 0, 0, 100, 100) // Disegna immagine flippata
      } else {
        ctx.drawImage(frame, this.xPos, this.yPos, 100, 100)
      }
      ctx.restore()
    }
  }

  // Aggiorna l'animazione in base al tempo trascorso
  animate(timestamp) {
    if (timestamp - this.lastUpdateTime > this.frameDelay) {
      this.currentFrame++
      if (this.currentFrame >= this.frames.length) this.currentFrame = 0
      this.lastUpdateTime = timestamp
    }
  }

  // Metodo generico per il movimento: verrà **override** nelle classi derivate
  move(keyPressed: any) {
    console.log('Metodo move() generico: implementa il movimento specifico nelle classi derivate.')
  }

  // Metodo di aggiornamento chiamato dal game loop (aggregando animate, move e draw)
  update(timestamp) {
    this.animate(timestamp)
    if (this.animationChanged) {
      this.loadFrames(this.currentAnimation)
      this.animationChanged = false
    }
    this.drawFrame()
  }
}
