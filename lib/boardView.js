class BoardView {
  constructor(canvas, ctx, density, board, colors) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 500;
    this.height = 500;
    this.density = density;
    this.COLORS = colors;
    this.currentColor = "#fff";
    this.board = board;
    this.dx = this.width / this.density;
    this.running = false;
    this.painting = false;
    this.iterateButton = document.getElementById("iterate");
    this.startButton = document.getElementById("start");
    this.stopButton = document.getElementById("stop");
    this.clearButton = document.getElementById("clear");
    this.randomButton = document.getElementById("random");
    this.bindHandlers();
    this.render();
    this.populateColors();
  }

  populateColors() {
    let $colors = $(".colors");
    let that = this;
    this.COLORS.forEach( color => {
      let $li = $('<li></li>');
      $li.css("background-color", color);
      $li.on("click", (e) => {
        e.preventDefault();
        $(".colors li").removeClass("selected");
        $li.addClass("selected");
        that.currentColor = color;
      });
      $colors.append($li);
    });
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
    this.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      that.clear();
    });
    this.randomButton.addEventListener("click", (e) => {
      e.preventDefault();
      that.random();
    });
    this.canvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.painting = true;
    });
    this.canvas.addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.painting = false;
    });
    this.canvas.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (this.painting) {
        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;
        let i = Math.floor(x / this.dx);
        let j = Math.floor(y / this.dx);
        this.board.cells[j][i].color = this.currentColor;
        this.board.cells[j][i].id = this.COLORS.indexOf(this.currentColor);
        this.render();
      }
    });
    this.canvas.addEventListener("mouseout", (e) => {
      e.preventDefault();
      this.painting = false;
    });
  }

  random() {
    this.stop();
    this.board.createGrid();
    this.render();
  }

  clear() {
    this.stop();
    this.resetCells();
    this.render();
    this.render();
  }

  iterate() {
    this.board.updateColors(this.render.bind(this));
  }

  run() {
    if (!this.running) {
      this.myInterval = setInterval(this.iterate.bind(this), 50);
      this.running = true;
    }
  }

  stop() {
    clearInterval(this.myInterval);
    this.running = false;
  }

  resetCells() {
    for (let i = 0; i < this.density; i++) {
      for (let j = 0; j < this.density; j++) {
        this.board.cells[i][j].reset();
      }
    }
  }

  render(defaultColor) {
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
