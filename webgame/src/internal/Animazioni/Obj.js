class Obj {  

  constructor({ canvas, ctx, framePaths, xPos = 50, yPos = 50, speed = 3, initialAnimation = 'idle', frameDelay = 100 }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.framePaths = framePaths;        // Oggetto contenente le path dei frame per ciascuna animazione
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
    this.currentAnimation = initialAnimation;
    this.frames = [];
    this.currentFrame = 0;
    this.frameDelay = frameDelay;
    this.lastUpdateTime = performance.now();
    this.facingDirection = 'right';
    this.animationInProgress = false;

    this.loadFrames(this.currentAnimation);
  }

  // Carica i frame dell'animazione richiesta
  loadFrames(animationName) {
    this.frames = [];
    this.currentFrame = 0;
    if (!this.framePaths[animationName]) {
      console.error(`Animazione ${animationName} non trovata.`);
      return;
    }
    this.framePaths[animationName].forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onerror = () => console.error(`Errore nel caricamento dell'immagine: ${path}`);
      this.frames.push(img);
    });
  }

  // Disegna il frame corrente sul canvas
  drawFrame() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.frames.length === 0 || !this.frames[this.currentFrame]) {
      console.error("Frame non disponibile o non caricato correttamente.");
      return;
    }

    const frame = this.frames[this.currentFrame];

    if (frame.complete) {
      ctx.save();
      if (this.facingDirection === 'left') {
        ctx.translate(this.xPos + 100, this.yPos); // Sposta l'origine per il flip
        ctx.scale(-1, 1);
        ctx.drawImage(frame, 0, 0, 100, 100);       // Disegna immagine flippata
      } else {
        ctx.drawImage(frame, this.xPos, this.yPos, 100, 100);
      }
      ctx.restore();
    }
  }

  // Aggiorna l'animazione in base al tempo trascorso
  animate(timestamp) {
    if (timestamp - this.lastUpdateTime > this.frameDelay) {
      this.currentFrame++;
      if (this.currentFrame >= this.frames.length) {
        // Se si sta eseguendo un'animazione speciale (es. attacco, danno, morte)
        if (this.animationInProgress) {
          this.animationInProgress = false; // Termina l'animazione speciale
          this.currentAnimation = 'idle';     // Ritorna all'animazione idle
          this.loadFrames(this.currentAnimation);
        }
        this.currentFrame = 0;
      }
      this.lastUpdateTime = timestamp;
    }
  }

  // Metodo generico per il movimento: verrà **override** nelle classi derivate
  move() {
    console.log("Metodo move() generico: implementa il movimento specifico nelle classi derivate.");
  }

  // Metodo di aggiornamento chiamato dal game loop (aggregando animate, move e draw)
  update(timestamp) {
    this.animate(timestamp);
    this.move();
    this.drawFrame();
  }
}
