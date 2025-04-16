import { Player } from '@/internal/Animazioni/Player';

export class Mage extends Player {
    constructor(canvas, ctx) {
      super(canvas, ctx);
      this.framePaths = {
        run: ['@/Mage/Run/frame_0_0@png', '@/Mage/Run/frame_0_1@png', '@/Mage/Run/frame_0_2@png', '@/Mage/Run/frame_0_3@png', '@/Mage/Run/frame_0_4@png', '@/Mage/Run/frame_0_5@png', '@/Mage/Run/frame_0_6@png', '@/Mage/Run/frame_0_7@png'],
        attack1: ['@/Mage/Attack 1/frame_0_0@png', '@/Mage/Attack 1/frame_0_1@png', '@/Mage/Attack 1/frame_0_2@png', '@/Mage/Attack 1/frame_0_3@png', '@/Mage/Attack 1/frame_0_4@png', '@/Mage/Attack 1/frame_0_5@png', '@/Mage/Attack 1/frame_0_6@png', '@/Mage/Attack 1/frame_0_7@png', '@/Mage/Attack 1/frame_0_8@png', '@/Mage/Attack 1/frame_0_9@png'],
        attack2: ['@/Mage/Attack 2/frame_0_0@png', '@/Mage/Attack 2/frame_0_1@png', '@/Mage/Attack 2/frame_0_2@png', '@/Mage/Attack 2/frame_0_3@png'],
        special: ['@/Mage/Special/frame_0_0@png', '@/Mage/Special/frame_0_1@png', '@/Mage/Special/frame_0_2@png', '@/Mage/Special/frame_0_3@png', '@/Mage/Special/frame_0_4@png', '@/Mage/Special/frame_0_5@png', '@/Mage/Special/frame_0_6@png', '@/Mage/Special/frame_0_7@png', '@/Mage/Special/frame_0_8@png', '@/Mage/Special/frame_0_9@png', '@/Mage/Special/frame_0_10@png', '@/Mage/Special/frame_0_11@png'],
        idle: ['@/Mage/Idle/frame_0_0@png', '@/Mage/Idle/frame_0_1@png', '@/Mage/Idle/frame_0_2@png', '@/Mage/Idle/frame_0_3@png', '@/Mage/Idle/frame_0_4@png', '@/Mage/Idle/frame_0_5@png', '@/Mage/Idle/frame_0_6@png'],
        hurt: ['@/Mage/Hurt/frame_0_0@png', '@/Mage/Hurt/frame_0_1@png', '@/Mage/Hurt/frame_0_2@png'],
        dead: ['@/Mage/Dead/frame_0_0@png', '@/Mage/Dead/frame_0_1@png', '@/Mage/Dead/frame_0_2@png', '@/Mage/Dead/frame_0_3@png', '@/Mage/Dead/frame_0_4@png']
      };
    }
  }