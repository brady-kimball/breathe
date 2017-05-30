class BoardView {
  constructor(ctx, density, board) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 500;
    this.density = density;
    this.board = board;
    this.iterateButton = document.getElementById("iterate");
    this.startButton = document.getElementById("start");
    this.stopButton = document.getElementById("stop");
    this.bindHandlers();
    this.render();
  }

  bindHandlers() {
    let that = this;
    this.iterateButton.addEventListener("click", (e) => {
      e.preventDefault();
      that.iterate();
    });
    this.startButton.addEventListener("click", (e) => {
      e.preventDefault();
      that.run();
    });
    this.stopButton.addEventListener("click", (e) => {
      e.preventDefault();
      that.stop();
    });
  }

  iterate() {
    this.board.updateColors(this.render.bind(this));
  }

  run() {
    this.myInterval = setInterval(this.iterate.bind(this), 50);
  }

  stop() {
    clearInterval(this.myInterval);
  }

  render() {
    let dx = this.width / this.density;
    let x = 0;
    let y = 0;
    for (let i = 0; i < this.density; i++) {
      x = 0;
      for (let j = 0; j < this.density; j++) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, dx, dx);
        this.ctx.fillStyle = this.board.cells[i][j].color;
        this.ctx.fill();
        x += dx;
      }
      y += dx;
    }
  }


}

export default BoardView;
