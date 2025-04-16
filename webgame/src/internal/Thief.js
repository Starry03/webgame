export class Ladro extends Player {
    constructor(options) {
      super(options);
      this.framePaths = {
        run: ['@/Karasu_tengu/Run/frame_0_0@png', '@/Karasu_tengu/Run/frame_0_1@png', '@/Karasu_tengu/Run/frame_0_2@png', '@/Karasu_tengu/Run/frame_0_3@png', '@/Karasu_tengu/Run/frame_0_4@png', '@/Karasu_tengu/Run/frame_0_5@png', '@/Karasu_tengu/Run/frame_0_6@png', '@/Karasu_tengu/Run/frame_0_7@png'],
        attack1: ['@/Karasu_tengu/Attack 2/frame_0_0@png', '@/Karasu_tengu/Attack 1/frame_0_1@png', '@/Karasu_tengu/Attack 1/frame_0_2@png', '@/Karasu_tengu/Attack 1/frame_0_3@png'],
        attack2: ['@/Karasu_tengu/Attack 3/frame_0_0@png', '@/Karasu_tengu/Attack 3/frame_0_1@png', '@/Karasu_tengu/Attack 3/frame_0_2@png'],
        special: ['@/Karasu_tengu/Attack 1/frame_0_0@png', '@/Karasu_tengu/Attack 1/frame_0_1@png', '@/Karasu_tengu/Attack 1/frame_0_2@png', '@/Karasu_tengu/Attack 1/frame_0_3@png', '@/Karasu_tengu/Attack 1/frame_0_4@png', '@/Karasu_tengu/Attack 1/frame_0_5@png'],
        idle: ['@/Karasu_tengu/Idle/frame_0_0@png', '@/Karasu_tengu/Idle/frame_0_1@png', '@/Karasu_tengu/Idle/frame_0_2@png', '@/Karasu_tengu/Idle/frame_0_3@png', '@/Karasu_tengu/Idle/frame_0_4@png', '@/Karasu_tengu/Idle/frame_0_5@png', '@/Karasu_tengu/Idle/frame_0_6@png', '@/Karasu_tengu/Idle/frame_0_7@png', '@/Karasu_tengu/Idle/frame_0_8@png', '@/Karasu_tengu/Idle/frame_0_9@png', '@/Karasu_tengu/Idle/frame_0_10@png'],
        hurt: ['@/Karasu_tengu/Hurt/frame_0_0@png', '@/Karasu_tengu/Hurt/frame_0_1@png', '@/Karasu_tengu/Hurt/frame_0_2@png'],
        dead: ['@/Karasu_tengu/Dead/frame_0_0@png', '@/Karasu_tengu/Dead/frame_0_1@png', '@/Karasu_tengu/Dead/frame_0_2@png', '@/Karasu_tengu/Dead/frame_0_3@png', '@/Karasu_tengu/Dead/frame_0_4@png', '@/Karasu_tengu/Dead/frame_0_5@png']
      };
    }
  }