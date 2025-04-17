import { AttackType } from '../types'
import { Obj } from './Obj'

export class Player extends Obj {
  constructor(canvas, ctx) {
    super(canvas, ctx)
    this.currentAnimation = 'idle'
  }

  getDirectionFromKeys(keysPressed: any) {
    let direction = null
    if (
      (keysPressed['ArrowRight'] || keysPressed['d']) &&
      (keysPressed['ArrowUp'] || keysPressed['w'])
    ) {
      direction = 'up-right'
    } else if (
      (keysPressed['ArrowRight'] || keysPressed['d']) &&
      (keysPressed['ArrowDown'] || keysPressed['s'])
    ) {
      direction = 'down-right'
    } else if (
      (keysPressed['ArrowLeft'] || keysPressed['a']) &&
      (keysPressed['ArrowUp'] || keysPressed['w'])
    ) {
      direction = 'up-left'
    } else if (
      (keysPressed['ArrowLeft'] || keysPressed['a']) &&
      (keysPressed['ArrowDown'] || keysPressed['s'])
    ) {
      direction = 'down-left'
    } else if (keysPressed['ArrowRight'] || keysPressed['d']) {
      direction = 'right'
    } else if (keysPressed['ArrowLeft'] || keysPressed['a']) {
      direction = 'left'
    } else if (keysPressed['ArrowUp'] || keysPressed['w']) {
      direction = 'up'
    } else if (keysPressed['ArrowDown'] || keysPressed['s']) {
      direction = 'down'
    }
    return direction
  }

  playAttackAnimation(type: AttackType) {
    this.animationInProgress = true
    this.animationChanged = true
    switch (type) {
      case AttackType.LIGHT:
        this.currentAnimation = 'attack1'
        console.log('Playing light attack animation')
        break
      case AttackType.HEAVY:
        this.currentAnimation = 'attack2'
        break
      case AttackType.SPECIAL:
        this.currentAnimation = 'special'
        break
      default:
        this.animationInProgress = false
        this.animationChanged = false
        console.log('Unknown attack type')
    }
  }

  // Overriding del metodo move per il giocatore
  move(key: any) {
    const direction = this.getDirectionFromKeys(key)
    this.currentAnimation = 'run'
    this.animationInProgress = true
    switch (direction) {
      case 'right':
        if (this.xPos + 100 < this.canvas.width) this.xPos += this.speed
        this.facingDirection = 'right'
        return true
      case 'left':
        if (this.xPos > 0) this.xPos -= this.speed
        this.facingDirection = 'left'
        return true
      case 'up':
        if (this.yPos > 0) this.yPos -= this.speed
        return true
      case 'down':
        if (this.yPos + 100 < this.canvas.height) this.yPos += this.speed
        return true
      case 'up-right':
        if (this.xPos + 100 < this.canvas.width) this.xPos += this.speed
        if (this.yPos > 0) this.yPos -= this.speed
        this.facingDirection = 'right'
        return true
      case 'up-left':
        if (this.xPos > 0) this.xPos -= this.speed
        if (this.yPos > 0) this.yPos -= this.speed
        this.facingDirection = 'left'
        return true
      case 'down-right':
        if (this.xPos + 100 < this.canvas.width) this.xPos += this.speed
        if (this.yPos + 100 < this.canvas.height) this.yPos += this.speed
        this.facingDirection = 'right'
        return true
      case 'down-left':
        if (this.xPos > 0) this.xPos -= this.speed
        if (this.yPos + 100 < this.canvas.height) this.yPos += this.speed
        this.facingDirection = 'left'
        return true
      default:
        this.animationInProgress = false
        return false
    }
  }

  // Metodo per gestire input e attivare animazioni
  handleInput(keyPressed: any) {
    if (keyPressed['e']) {
      this.playAttackAnimation(AttackType.LIGHT)
      return true
    } else if (keyPressed['q']) {
      this.playAttackAnimation(AttackType.HEAVY)
      return true
    } else if (keyPressed['r']) {
      this.playAttackAnimation(AttackType.SPECIAL)
      return true
    } else return this.move(keyPressed)
  }

  idle() {
    this.currentAnimation = 'idle'
    this.animationInProgress = false
    this.loadFrames(this.currentAnimation)
  }
}
