class BoardView {
  constructor(ctx, density, board) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 500;
    this.density = density;
    this.board = board;
    this.render();
  }

  render() {
    let dx = this.width / this.density;
    let x = 0;
    let y = 0;
    for (let i = 0; i < this.density; i++) {
      y = 0;
      for (let j = 0; j < this.density; j++) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, dx, dx);
        this.ctx.fillStyle = this.board.cells[i][j].color;
        this.ctx.fill();

        y += dx;
      }
      x += dx;
    }
  }
}

export default BoardView;
