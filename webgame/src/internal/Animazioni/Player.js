class Player extends Obj {
  constructor(options) {
    super(options);
    this.keysPressed = {}; // Memorizza lo stato dei tasti premuti
  }

  Mage = {
    run: ['./Mage/Run/frame_0_0.png', './Mage/Run/frame_0_1.png', './Mage/Run/frame_0_2.png', './Mage/Run/frame_0_3.png', './Mage/Run/frame_0_4.png', './Mage/Run/frame_0_5.png', './Mage/Run/frame_0_6.png', './Mage/Run/frame_0_7.png'],
    attack1: ['./Mage/Attack 1/frame_0_0.png', './Mage/Attack 1/frame_0_1.png', './Mage/Attack 1/frame_0_2.png', './Mage/Attack 1/frame_0_3.png', './Mage/Attack 1/frame_0_4.png', './Mage/Attack 1/frame_0_5.png', './Mage/Attack 1/frame_0_6.png', './Mage/Attack 1/frame_0_7.png', './Mage/Attack 1/frame_0_8.png', './Mage/Attack 1/frame_0_9.png'],
    attack2: ['./Mage/Attack 2/frame_0_0.png', './Mage/Attack 2/frame_0_1.png', './Mage/Attack 2/frame_0_2.png', './Mage/Attack 2/frame_0_3.png'],
    special: ['./Mage/Special/frame_0_0.png', './Mage/Special/frame_0_1.png', './Mage/Special/frame_0_2.png', './Mage/Special/frame_0_3.png', './Mage/Special/frame_0_4.png', './Mage/Special/frame_0_5.png', './Mage/Special/frame_0_6.png', './Mage/Special/frame_0_7.png', './Mage/Special/frame_0_8.png', './Mage/Special/frame_0_9.png', './Mage/Special/frame_0_10.png', './Mage/Special/frame_0_11.png'],
    idle: ['./Mage/Idle/frame_0_0.png', './Mage/Idle/frame_0_1.png', './Mage/Idle/frame_0_2.png', './Mage/Idle/frame_0_3.png', './Mage/Idle/frame_0_4.png', './Mage/Idle/frame_0_5.png', './Mage/Idle/frame_0_6.png'],
    hurt: ['./Mage/Hurt/frame_0_0.png', './Mage/Hurt/frame_0_1.png', './Mage/Hurt/frame_0_2.png'],
    dead: ['./Mage/Dead/frame_0_0.png', './Mage/Dead/frame_0_1.png', './Mage/Dead/frame_0_2.png', './Mage/Dead/frame_0_3.png', './Mage/Dead/frame_0_4.png']
  };

  Samurai = {
    run: ['./Samurai/Run/frame_0_0.png', './Samurai/Run/frame_0_1.png', './Samurai/Run/frame_0_2.png', './Samurai/Run/frame_0_3.png', './Samurai/Run/frame_0_4.png', './Samurai/Run/frame_0_5.png', './Samurai/Run/frame_0_6.png', './Samurai/Run/frame_0_7.png'],
    attack1: ['./Samurai/Attack 1/frame_0_0.png', './Samurai/Attack 1/frame_0_1.png', './Samurai/Attack 1/frame_0_2.png', './Samurai/Attack 1/frame_0_3.png', './Samurai/Attack 1/frame_0_4.png', './Samurai/Attack 1/frame_0_5.png', './Samurai/Attack 1/frame_0_6.png', './Samurai/Attack 1/frame_0_7.png', './Samurai/Attack 1/frame_0_8.png', './Samurai/Attack 1/frame_0_9.png'],
    attack2: ['./Samurai/Attack 3/frame_0_0.png', './Samurai/Attack 3/frame_0_1.png', './Samurai/Attack 3/frame_0_2.png', './Samurai/Attack 3/frame_0_3.png'],
    special: ['./Samurai/Attack 2/frame_0_0.png', './Samurai/Attack 2/frame_0_1.png', './Samurai/Attack 2/frame_0_2.png', './Samurai/Attack 2/frame_0_3.png', './Samurai/Attack 2/frame_0_4.png'],
    idle: ['./Samurai/Idle/frame_0_0.png', './Samurai/Idle/frame_0_1.png', './Samurai/Idle/frame_0_2.png', './Samurai/Idle/frame_0_3.png', './Samurai/Idle/frame_0_4.png', './Samurai/Idle/frame_0_5.png'],
    hurt: ['./Samurai/Hurt/frame_0_0.png', './Samurai/Hurt/frame_0_1.png', './Samurai/Hurt/frame_0_2.png'],
    dead: ['./Samurai/Dead/frame_0_0.png', './Samurai/Dead/frame_0_1.png', './Samurai/Dead/frame_0_2.png', './Samurai/Dead/frame_0_3.png', './Samurai/Dead/frame_0_4.png', './Samurai/Dead/frame_0_5.png']
  };

  Ladro = {
    run: ['./Karasu_tengu/Run/frame_0_0.png', './Karasu_tengu/Run/frame_0_1.png', './Karasu_tengu/Run/frame_0_2.png', './Karasu_tengu/Run/frame_0_3.png', './Karasu_tengu/Run/frame_0_4.png', './Karasu_tengu/Run/frame_0_5.png', './Karasu_tengu/Run/frame_0_6.png', './Karasu_tengu/Run/frame_0_7.png'],
    attack1: ['./Karasu_tengu/Attack 2/frame_0_0.png', './Karasu_tengu/Attack 1/frame_0_1.png', './Karasu_tengu/Attack 1/frame_0_2.png', './Karasu_tengu/Attack 1/frame_0_3.png'],
    attack2: ['./Karasu_tengu/Attack 3/frame_0_0.png', './Karasu_tengu/Attack 3/frame_0_1.png', './Karasu_tengu/Attack 3/frame_0_2.png'],
    special: ['./Karasu_tengu/Attack 1/frame_0_0.png', './Karasu_tengu/Attack 1/frame_0_1.png', './Karasu_tengu/Attack 1/frame_0_2.png', './Karasu_tengu/Attack 1/frame_0_3.png', './Karasu_tengu/Attack 1/frame_0_4.png', './Karasu_tengu/Attack 1/frame_0_5.png'],
    idle: ['./Karasu_tengu/Idle/frame_0_0.png', './Karasu_tengu/Idle/frame_0_1.png', './Karasu_tengu/Idle/frame_0_2.png', './Karasu_tengu/Idle/frame_0_3.png', './Karasu_tengu/Idle/frame_0_4.png', './Karasu_tengu/Idle/frame_0_5.png', './Karasu_tengu/Idle/frame_0_6.png', './Karasu_tengu/Idle/frame_0_7.png', './Karasu_tengu/Idle/frame_0_8.png', './Karasu_tengu/Idle/frame_0_9.png', './Karasu_tengu/Idle/frame_0_10.png'],
    hurt: ['./Karasu_tengu/Hurt/frame_0_0.png', './Karasu_tengu/Hurt/frame_0_1.png', './Karasu_tengu/Hurt/frame_0_2.png'],
    dead: ['./Karasu_tengu/Dead/frame_0_0.png', './Karasu_tengu/Dead/frame_0_1.png', './Karasu_tengu/Dead/frame_0_2.png', './Karasu_tengu/Dead/frame_0_3.png', './Karasu_tengu/Dead/frame_0_4.png', './Karasu_tengu/Dead/frame_0_5.png']
  };

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
}
