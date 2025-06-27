export class GraphCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scale: number = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context not supported");
    this.ctx = ctx;

    this.initEvents();
    this.draw();
  }

  private initEvents() {
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 0.9 : 1.1;
      this.scale *= direction;
      this.draw();
    });
  }

  private drawGrid() {
    const { width, height } = this.canvas;
    const spacing = 50 * this.scale;

    this.ctx.strokeStyle = "#333";
    for (let x = 0; x < width; x += spacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }

    for (let y = 0; y < height; y += spacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }
  }

  public draw() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    this.drawGrid();
  }
}
