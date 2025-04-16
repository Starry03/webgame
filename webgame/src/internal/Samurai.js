export class Samurai extends Player {
  constructor(options) {
    super(options);
    this.framePaths = {
      run: ['./Samurai/Run/frame_0_0.png', './Samurai/Run/frame_0_1.png', './Samurai/Run/frame_0_2.png', './Samurai/Run/frame_0_3.png', './Samurai/Run/frame_0_4.png', './Samurai/Run/frame_0_5.png', './Samurai/Run/frame_0_6.png', './Samurai/Run/frame_0_7.png'],
      attack1: ['./Samurai/Attack 1/frame_0_0.png', './Samurai/Attack 1/frame_0_1.png', './Samurai/Attack 1/frame_0_2.png', './Samurai/Attack 1/frame_0_3.png', './Samurai/Attack 1/frame_0_4.png', './Samurai/Attack 1/frame_0_5.png', './Samurai/Attack 1/frame_0_6.png', './Samurai/Attack 1/frame_0_7.png', './Samurai/Attack 1/frame_0_8.png', './Samurai/Attack 1/frame_0_9.png'],
      attack2: ['./Samurai/Attack 3/frame_0_0.png', './Samurai/Attack 3/frame_0_1.png', './Samurai/Attack 3/frame_0_2.png', './Samurai/Attack 3/frame_0_3.png'],
      special: ['./Samurai/Attack 2/frame_0_0.png', './Samurai/Attack 2/frame_0_1.png', './Samurai/Attack 2/frame_0_2.png', './Samurai/Attack 2/frame_0_3.png', './Samurai/Attack 2/frame_0_4.png'],
      idle: ['./Samurai/Idle/frame_0_0.png', './Samurai/Idle/frame_0_1.png', './Samurai/Idle/frame_0_2.png', './Samurai/Idle/frame_0_3.png', './Samurai/Idle/frame_0_4.png', './Samurai/Idle/frame_0_5.png'],
      hurt: ['./Samurai/Hurt/frame_0_0.png', './Samurai/Hurt/frame_0_1.png', './Samurai/Hurt/frame_0_2.png'],
      dead: ['./Samurai/Dead/frame_0_0.png', './Samurai/Dead/frame_0_1.png', './Samurai/Dead/frame_0_2.png', './Samurai/Dead/frame_0_3.png', './Samurai/Dead/frame_0_4.png', './Samurai/Dead/frame_0_5.png']
    };
  }
}