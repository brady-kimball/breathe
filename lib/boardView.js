class BoardView {
  constructor(ctx, density) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 500;
    this.density = density;
    this.render();
  }

  render() {
    let dx = this.width / this.density;
    let x = 0;
    let y = 0;
    let COLORS = ['#FF0000', '#00FF00', '#0000FF'];
    for (let i = 0; i < this.density; i++) {
      y = 0;
      for (let j = 0; j < this.density; j++) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, dx, dx);
        this.ctx.fillStyle = COLORS[Math.floor(Math.random() * 3)];
        this.ctx.fill();

        y += dx;
        console.log([`${x}, ${y}`]);
      }
      x += dx;
    }
  }
}

export default BoardView;
