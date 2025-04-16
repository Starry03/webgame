import type { Player } from "./Animazioni/Player";

export class GameHandlder {
    player: Player;

    constructor(player: Player) {
        this.player = player;
        this.player.loadFrames(this.player.currentAnimation)
        this.gameLoop = this.gameLoop.bind(this);
    }

    gameLoop(timestamp: any) {
        this.player.animate(timestamp);
        if (this.player.currentAnimation === 'run') {
            this.player.move()
        }
        this.player.drawFrame();
        requestAnimationFrame(this.gameLoop);
    }
}