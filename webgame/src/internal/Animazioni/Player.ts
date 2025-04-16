import { AttackType } from '../types';
import { Obj } from './Obj';

export class Player extends Obj {
  currentAnimation: string;
  constructor(canvas, ctx) {
    super(canvas, ctx);
    this.currentAnimation = 'idle';
  }

  getDirectionFromKeys(keysPressed: any) {
    
    let direction = null;
    if ((keysPressed['ArrowRight'] || keysPressed['d']) && (keysPressed['ArrowUp'] || keysPressed['w'])) {
      direction = 'up-right';
    } else if ((keysPressed['ArrowRight'] || keysPressed['d']) && (keysPressed['ArrowDown'] || keysPressed['s'])) {
      direction = 'down-right';
    } else if ((keysPressed['ArrowLeft'] || keysPressed['a']) && (keysPressed['ArrowUp'] || keysPressed['w'])) {
      direction = 'up-left';
    } else if ((keysPressed['ArrowLeft'] || keysPressed['a']) && (keysPressed['ArrowDown'] || keysPressed['s'])) {
      direction = 'down-left';
    } else if (keysPressed['ArrowRight'] || keysPressed['d']) {
      direction = 'right';
    } else if (keysPressed['ArrowLeft'] || keysPressed['a']) {
      direction = 'left';
    } else if (keysPressed['ArrowUp'] || keysPressed['w']) {
      direction = 'up';
    } else if (keysPressed['ArrowDown'] || keysPressed['s']) {
      direction = 'down';
    }
    return direction;
  }

  playAttackAnimation(type: AttackType) {
    switch (type) {
      case AttackType.LIGHT:
        this.currentAnimation = 'light-attack';
        console.log('Playing light attack animation');
        break;
      case AttackType.HEAVY:
        this.currentAnimation = 'heavy-attack';
        console.log('Playing heavy attack animation');
        break;
      case AttackType.SPECIAL:
        this.currentAnimation = 'special-attack';
        console.log('Playing special attack animation');
        break;
      default:
        console.log('Unknown attack type');
    }
  }

  // Overriding del metodo move per il giocatore
  move(key: any) {
    const direction = this.getDirectionFromKeys(key);
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
  handleInput(keyPressed: any) {
    if (keyPressed['e']) {
      this.playAttackAnimation(AttackType.LIGHT);
    } else if (keyPressed['q']) {
      this.playAttackAnimation(AttackType.HEAVY);
    } else if (keyPressed['r']) {
      this.playAttackAnimation(AttackType.SPECIAL);
    }
    else this.move(keyPressed);
  }
}