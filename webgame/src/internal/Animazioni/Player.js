class Player extends Obj {
  constructor(options) {
    super(options);
    this.keysPressed = {}; // Memorizza lo stato dei tasti premuti
    this.currentAnimation = null; // Memorizza l'animazione corrente
  }

  // Metodo ausiliario: determina la direzione in base ai tasti premuti
  getDirectionFromKeys() {
    let direction = null;
    if ((this.keysPressed['ArrowRight'] || this.keysPressed['d']) && (this.keysPressed['ArrowUp'] || this.keysPressed['w'])) {
      direction = 'up-right';
    } else if ((this.keysPressed['ArrowRight'] || this.keysPressed['d']) && (this.keysPressed['ArrowDown'] || this.keysPressed['s'])) {
      direction = 'down-right';
    } else if ((this.keysPressed['ArrowLeft'] || this.keysPressed['a']) && (this.keysPressed['ArrowUp'] || this.keysPressed['w'])) {
      direction = 'up-left';
    } else if ((this.keysPressed['ArrowLeft'] || this.keysPressed['a']) && (this.keysPressed['ArrowDown'] || this.keysPressed['s'])) {
      direction = 'down-left';
    } else if (this.keysPressed['ArrowRight'] || this.keysPressed['d']) {
      direction = 'right';
    } else if (this.keysPressed['ArrowLeft'] || this.keysPressed['a']) {
      direction = 'left';
    } else if (this.keysPressed['ArrowUp'] || this.keysPressed['w']) {
      direction = 'up';
    } else if (this.keysPressed['ArrowDown'] || this.keysPressed['s']) {
      direction = 'down';
    }
    return direction;
  }

  playAttackAnimation(type) {
    switch (type) {
      case 'light':
        this.currentAnimation = 'light-attack';
        console.log('Playing light attack animation');
        break;
      case 'heavy':
        this.currentAnimation = 'heavy-attack';
        console.log('Playing heavy attack animation');
        break;
      case 'special':
        this.currentAnimation = 'special-attack';
        console.log('Playing special attack animation');
        break;
      default:
        console.log('Unknown attack type');
    }
  }

  // Overriding del metodo move per il giocatore
  move() {
    const direction = this.getDirectionFromKeys();
    switch (direction) {
      case 'right':
        if (this.xPos + 100 < this.canvas.width) this.xPos += this.speed;
        this.facingDirection = 'right';
        break;
      case 'left':
        if (this.xPos > 0) this.xPos -= this.speed;
        this.facingDirection = 'left';
        break;
      case 'up':
        if (this.yPos > 0) this.yPos -= this.speed;
        break;
      case 'down':
        if (this.yPos + 100 < this.canvas.height) this.yPos += this.speed;
        break;
      case 'up-right':
        if (this.xPos + 100 < this.canvas.width) this.xPos += this.speed;
        if (this.yPos > 0) this.yPos -= this.speed;
        this.facingDirection = 'right';
        break;
      case 'up-left':
        if (this.xPos > 0) this.xPos -= this.speed;
        if (this.yPos > 0) this.yPos -= this.speed;
        this.facingDirection = 'left';
        break;
      case 'down-right':
        if (this.xPos + 100 < this.canvas.width) this.xPos += this.speed;
        if (this.yPos + 100 < this.canvas.height) this.yPos += this.speed;
        this.facingDirection = 'right';
        break;
      case 'down-left':
        if (this.xPos > 0) this.xPos -= this.speed;
        if (this.yPos + 100 < this.canvas.height) this.yPos += this.speed;
        this.facingDirection = 'left';
        break;
    }
  }


 // Metodo per gestire input e attivare animazioni
  handleInput(input) {
    if (input === 'e') {
      this.playAttackAnimation('light');
    } else if (input === 'q') {
      this.playAttackAnimation('heavy');
    } else if (input === 'r') {
      this.playAttackAnimation('special');
    }
  }
}