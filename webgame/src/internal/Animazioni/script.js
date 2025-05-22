const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const framePaths = {
  run: [
    './Mage/Run/frame_0_0.png',
    './Mage/Run/frame_0_1.png',
    './Mage/Run/frame_0_2.png',
    './Mage/Run/frame_0_3.png',
    './Mage/Run/frame_0_4.png',
    './Mage/Run/frame_0_5.png',
    './Mage/Run/frame_0_6.png',
    './Mage/Run/frame_0_7.png',
  ],
  attack1: [
    './Mage/Attack 1/frame_0_0.png',
    './Mage/Attack 1/frame_0_1.png',
    './Mage/Attack 1/frame_0_2.png',
    './Mage/Attack 1/frame_0_3.png',
    './Mage/Attack 1/frame_0_4.png',
    './Mage/Attack 1/frame_0_5.png',
    './Mage/Attack 1/frame_0_6.png',
    './Mage/Attack 1/frame_0_7.png',
    './Mage/Attack 1/frame_0_8.png',
    './Mage/Attack 1/frame_0_9.png',
  ],
  attack2: [
    './Mage/Attack 2/frame_0_0.png',
    './Mage/Attack 2/frame_0_1.png',
    './Mage/Attack 2/frame_0_2.png',
    './Mage/Attack 2/frame_0_3.png',
  ],
  special: [
    './Mage/Special/frame_0_0.png',
    './Mage/Special/frame_0_1.png',
    './Mage/Special/frame_0_2.png',
    './Mage/Special/frame_0_3.png',
    './Mage/Special/frame_0_4.png',
    './Mage/Special/frame_0_5.png',
    './Mage/Special/frame_0_6.png',
    './Mage/Special/frame_0_7.png',
    './Mage/Special/frame_0_8.png',
    './Mage/Special/frame_0_9.png',
    './Mage/Special/frame_0_10.png',
    './Mage/Special/frame_0_11.png',
  ],
  idle: [
    './Mage/Idle/frame_0_0.png',
    './Mage/Idle/frame_0_1.png',
    './Mage/Idle/frame_0_2.png',
    './Mage/Idle/frame_0_3.png',
    './Mage/Idle/frame_0_4.png',
    './Mage/Idle/frame_0_5.png',
    './Mage/Idle/frame_0_6.png',
  ],
  hurt: ['./Mage/Hurt/frame_0_0.png', './Mage/Hurt/frame_0_1.png', './Mage/Hurt/frame_0_2.png'],
  dead: [
    './Mage/Dead/frame_0_0.png',
    './Mage/Dead/frame_0_1.png',
    './Mage/Dead/frame_0_2.png',
    './Mage/Dead/frame_0_3.png',
    './Mage/Dead/frame_0_4.png',
  ],
}

let currentAnimation = 'idle' // Animazione iniziale
let frames = []
let currentFrame = 0
let frameDelay = 100 // Ritardo tra frame in millisecondi
let lastUpdateTime = 0
let idleTimeout // Timer per tornare all'animazione idle

let xPos = 50 // Posizione del personaggio
let yPos = 50 // Posizione del personaggio
const speed = 3 // Velocità di movimento
let direction = null // Direzione corrente (null se nessuna freccia è premuta)
let facingDirection = 'right' // La direzione verso cui il personaggio è rivolto
let animationInProgress = false // Flag per animazioni complete (es. attacco, danno, morte)
let keysPressed = {} // Memorizza i tasti premuti

// Carica i frame dell'animazione selezionata
function loadFrames(animationName) {
  frames = []
  currentFrame = 0 // Reset immediato del frame corrente
  framePaths[animationName].forEach((path) => {
    const img = new Image()
    img.src = path
    //img.onload = () => console.log(`Immagine caricata correttamente: ${path}`);
    img.onerror = () => console.error(`Errore nel caricamento dell'immagine: ${path}`)
    frames.push(img)
  })
  
}

// Disegna il frame corrente
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height) // Pulisci il canvas

  if (frames.length === 0 || !frames[currentFrame]) {
    console.error('Frame corrente mancante o non caricato correttamente.')
    return
  }

  const frame = frames[currentFrame]

  if (frame.complete) {
    ctx.save() // Salva lo stato del canvas

    if (facingDirection === 'left') {
      ctx.translate(xPos + 100, yPos) // Sposta l'origine per il flip
      ctx.scale(-1, 1) // Inverte l'immagine orizzontalmente
      ctx.drawImage(frame, 0, 0, 100, 100) // Disegna l'immagine flippata
    } else {
      ctx.drawImage(frame, xPos, yPos, 100, 100) // Disegna normalmente
    }

    ctx.restore() // Ripristina lo stato del canvas
  }
}

// Aggiorna il frame
function updateAnimation(timestamp) {
  if (timestamp - lastUpdateTime > frameDelay) {
    currentFrame++
    if (currentFrame >= frames.length) {
      if (animationInProgress) {
        animationInProgress = false // Fine animazione speciale (attacco, danno, morte)
        currentAnimation = 'idle' // Torna a idle
        loadFrames(currentAnimation)
      }
      currentFrame = 0 // Ripristina il frame corrente
    }
    lastUpdateTime = timestamp
  }
}

// Ciclo di animazione
function gameLoop(timestamp) {
  updateAnimation(timestamp)
  if (currentAnimation === 'run' && direction) {
    moveCharacter()
  }
  drawFrame()
  requestAnimationFrame(gameLoop)
}

// Gestione dei tasti premuti
window.addEventListener('keydown', (event) => {
  event.preventDefault() // Previene il comportamento predefinito del browser (es. scroll)

  // Interrompi animazioni non bloccanti se necessario
  if (animationInProgress && !['dead'].includes(currentAnimation)) {
    animationInProgress = false // Interrompi l'animazione in corso
    currentFrame = 0 // Reset immediato del frame corrente
  }

  // Memorizza i tasti premuti
  keysPressed[event.key] = true

  // Gestisci direzione
  if (keysPressed['ArrowRight'] && keysPressed['ArrowUp']) {
    direction = 'up-right'
    facingDirection = 'right'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['ArrowRight'] && keysPressed['ArrowDown']) {
    direction = 'down-right'
    facingDirection = 'right'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['ArrowLeft'] && keysPressed['ArrowUp']) {
    direction = 'up-left'
    facingDirection = 'left'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['ArrowLeft'] && keysPressed['ArrowDown']) {
    direction = 'down-left'
    facingDirection = 'left'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['ArrowRight']) {
    direction = 'right'
    facingDirection = 'right'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['ArrowLeft']) {
    direction = 'left'
    facingDirection = 'left'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['ArrowUp']) {
    direction = 'up'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['ArrowDown']) {
    direction = 'down'
    if (currentAnimation !== 'run') {
      currentAnimation = 'run'
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['q']) {
    if (!animationInProgress) {
      currentAnimation = 'attack1'
      animationInProgress = true // Blocca temporaneamente per completare l'animazione
      loadFrames(currentAnimation)
    }
  } // Attacco 1
  else if (keysPressed['e']) {
    if (!animationInProgress) {
      currentAnimation = 'attack2'
      animationInProgress = true // Blocca temporaneamente per completare l'animazione
      loadFrames(currentAnimation)
    }
  } // Attacco 2
  else if (keysPressed['r']) {
    if (!animationInProgress) {
      currentAnimation = 'special'
      animationInProgress = true // Blocca temporaneamente per completare l'animazione
      loadFrames(currentAnimation)
    }
  } else if (keysPressed['h']) {
    // Danno
    if (!animationInProgress) {
      currentAnimation = 'hurt'
      animationInProgress = true
      loadFrames(currentAnimation)
    }
  } // Danno
  else if (keysPressed['d']) {
    if (!animationInProgress) {
      currentAnimation = 'dead'
      animationInProgress = true
      loadFrames(currentAnimation)
    }
  } // Morte
})

window.addEventListener('keyup', (event) => {
  keysPressed[event.key] = false // Rimuovi il tasto rilasciato

  // Se non ci sono tasti premuti, torna a idle
  if (
    !keysPressed['ArrowRight'] &&
    !keysPressed['ArrowLeft'] &&
    !keysPressed['ArrowUp'] &&
    !keysPressed['ArrowDown']
  ) {
    direction = null // Nessuna direzione
    if (!animationInProgress) {
      // Solo se non ci sono animazioni bloccanti
      currentAnimation = 'idle'
      loadFrames(currentAnimation)
    }
  }
})

// Modifica della funzione moveCharacter per movimenti obliqui
function moveCharacter() {
  switch (direction) {
    case 'right':
      if (xPos + 100 < canvas.width) xPos += speed
      break
    case 'left':
      if (xPos > 0) xPos -= speed
      break
    case 'up':
      if (yPos > 0) yPos -= speed
      break
    case 'down':
      if (yPos + 100 < canvas.height) yPos += speed
      break
    case 'up-right':
      if (xPos + 100 < canvas.width) xPos += speed
      if (yPos > 0) yPos -= speed
      break
    case 'down-right':
      if (xPos + 100 < canvas.width) xPos += speed
      if (yPos + 100 < canvas.height) yPos += speed
      break
    case 'up-left':
      if (xPos > 0) xPos -= speed
      if (yPos > 0) yPos -= speed
      break
    case 'down-left':
      if (xPos > 0) xPos -= speed
      if (yPos + 100 < canvas.height) yPos += speed
      break
  }
}

// Avvia con l'animazione idle
loadFrames(currentAnimation)
gameLoop()
