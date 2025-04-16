class Player extends Obj {
  constructor(options) {
    super(options);
    this.keysPressed = {}; // Memorizza lo stato dei tasti premuti
    this.currentAnimation = null; // Memorizza l'animazione corrente
  }

  // Metodo ausiliario: determina la direzione in base ai tasti premuti
  getDirectionFromKeys() {
    let direction = null;
    if (this.keysPressed['ArrowRight'] && this.keysPressed['ArrowUp']) {
      direction = 'up-right';
    } else if (this.keysPressed['ArrowRight'] && this.keysPressed['ArrowDown']) {
      direction = 'down-right';
    } else if (this.keysPressed['ArrowLeft'] && this.keysPressed['ArrowUp']) {
      direction = 'up-left';
    } else if (this.keysPressed['ArrowLeft'] && this.keysPressed['ArrowDown']) {
      direction = 'down-left';
    } else if (this.keysPressed['ArrowRight']) {
      direction = 'right';
    } else if (this.keysPressed['ArrowLeft']) {
      direction = 'left';
    } else if (this.keysPressed['ArrowUp']) {
      direction = 'up';
    } else if (this.keysPressed['ArrowDown']) {
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
    if (input === 'light-attack') {
      this.playAttackAnimation('light');
    } else if (input === 'heavy-attack') {
      this.playAttackAnimation('heavy');
    } else if (input === 'special-attack') {
      this.playAttackAnimation('special');
    }
  }
}