import { Player } from '@/internal/Animazioni/Player';

export class Mage extends Player {
    constructor(canvas, ctx) {
      super(canvas, ctx);
      this.framePaths = {
        run: ['assets/Sprite/Giocatore/Mage/Run/frame_0_0.png', 'assets/Sprite/Giocatore/Mage/Run/frame_0_1.png', 'assets/Sprite/Giocatore/Mage/Run/frame_0_2.png', 'assets/Sprite/Giocatore/Mage/Run/frame_0_3.png', 'assets/Sprite/Giocatore/Mage/Run/frame_0_4.png', 'assets/Sprite/Giocatore/Mage/Run/frame_0_5.png', 'assets/Sprite/Giocatore/Mage/Run/frame_0_6.png', 'assets/Sprite/Giocatore/Mage/Run/frame_0_7.png'],
        attack1: ['assets/Sprite/Giocatore/Mage/Attack 1/frame_0_0.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_1.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_2.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_3.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_4.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_5.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_6.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_7.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_8.png', 'assets/Sprite/Giocatore/Mage/Attack 1/frame_0_9.png'],
        attack2: ['assets/Sprite/Giocatore/Mage/Attack 2/frame_0_0.png', 'assets/Sprite/Giocatore/Mage/Attack 2/frame_0_1.png', 'assets/Sprite/Giocatore/Mage/Attack 2/frame_0_2.png', 'assets/Sprite/Giocatore/Mage/Attack 2/frame_0_3.png'],
        special: ['assets/Sprite/Giocatore/Mage/Special/frame_0_0.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_1.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_2.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_3.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_4.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_5.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_6.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_7.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_8.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_9.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_10.png', 'assets/Sprite/Giocatore/Mage/Special/frame_0_11.png'],
        idle: ['assets/Sprite/Giocatore/Mage/Idle/frame_0_0.png', 'assets/Sprite/Giocatore/Mage/Idle/frame_0_1.png', 'assets/Sprite/Giocatore/Mage/Idle/frame_0_2.png', 'assets/Sprite/Giocatore/Mage/Idle/frame_0_3.png', 'assets/Sprite/Giocatore/Mage/Idle/frame_0_4.png', 'assets/Sprite/Giocatore/Mage/Idle/frame_0_5.png', 'assets/Sprite/Giocatore/Mage/Idle/frame_0_6.png'],
        hurt: ['assets/Sprite/Giocatore/Mage/Hurt/frame_0_0.png', 'assets/Sprite/Giocatore/Mage/Hurt/frame_0_1.png', 'assets/Sprite/Giocatore/Mage/Hurt/frame_0_2.png'],
        dead: ['assets/Sprite/Giocatore/Mage/Dead/frame_0_0.png', 'assets/Sprite/Giocatore/Mage/Dead/frame_0_1.png', 'assets/Sprite/Giocatore/Mage/Dead/frame_0_2.png', 'assets/Sprite/Giocatore/Mage/Dead/frame_0_3.png', 'assets/Sprite/Giocatore/Mage/Dead/frame_0_4.png']
      };
    }
  }