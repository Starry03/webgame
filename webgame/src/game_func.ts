type Vector2 = { x: number; y: number };

class Door {
  private position: Vector2;
  private isOpen: boolean = false;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.isOpen ? 'green' : 'brown';
    ctx.fillRect(this.position.x, this.position.y, 50, 100);
  }
}

class Enemy {
  private position: Vector2;
  private size: number = 50;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  move() {
    this.position.x += Math.random() * 4 - 2;
    this.position.y += Math.random() * 4 - 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

class GameHandler {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private doors: Door[] = [];

  public getDoors(): Door[] {
    return this.doors;
  }
  private enemies: Enemy[] = [];
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('CanvasRenderingContext2D not supported');
    this.ctx = ctx;

    this.initializeDoors();
    this.spawnEnemies();
  }

  private initializeDoors() {
    // Aggiungi alcune porte nella mappa
    this.doors.push(new Door(100, 100));
    this.doors.push(new Door(300, 100));
  }

  private spawnEnemies() {
    // Genera nemici in posizioni casuali
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.enemies.push(new Enemy(x, y));
    }
  }

  start() {
    this.animate();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Disegna le porte
    this.doors.forEach((door) => door.draw(this.ctx));

    // Disegna e muovi i nemici
    this.enemies.forEach((enemy) => {
      enemy.move();
      enemy.draw(this.ctx);
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  toggleDoor(index: number) {
    if (this.doors[index]) {
      this.doors[index].toggle();
    }
  }
}

// Funzione principale per avviare il gioco
export function startGame(canvas: HTMLCanvasElement) {
  const gameHandler = new GameHandler(canvas);

  // Aggiungi eventi per interagire con le porte
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    gameHandler.getDoors().forEach((door, index) => {
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Controlla se una porta è stata cliccata
      gameHandler.getDoors().forEach((door, index) => {
        if (
          x >= door['position'].x &&
          x <= door['position'].x + 50 &&
          y >= door['position'].y &&
          y <= door['position'].y + 100
        ) {
          gameHandler.toggleDoor(index);
        }
      });
    });
  });
  gameHandler.start();
}