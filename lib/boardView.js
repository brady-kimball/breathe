import * as Util from './util';

class BoardView {
  constructor(canvas, ctx, density, board, colors) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    ctx.canvas.width = this.width;
    ctx.canvas.height  = this.height - 10;
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
    this.resetButton = document.getElementById("reset");
    this.brushSlider = document.getElementById("brush-size");
    this.numColorsInput = document.getElementById("num-colors");
    this.randomColorsButton = document.getElementById("random-colors");
    this.thresholdInput = document.getElementById("threshold");
    this.pre1 = document.getElementById("pre1");
    this.pre2 = document.getElementById("pre2");
    this.pre3 = document.getElementById("pre3");
    this.optionsButton = document.getElementById("options");
    this.paintMenuButton = document.getElementById("paint-menu");
    this.hideButtons = document.querySelectorAll(".toggleHide");
    this.eyeButtons = document.querySelectorAll(".toggleHide i");
    this.bindHandlers();
    this.render();
    this.populateColors();
    this.brushSize = 2;
    this.speed = 50;
    this.numColors = 16;
  }

  setColors(colors) {
    this.COLORS = colors;
    this.populateColors();
  }

  populateColors() {
    let $colors = $(".colors");
    $colors.empty();
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
    this.resetButton.addEventListener("click", (e) => {
      e.preventDefault();
      that.random();
    });
    this.clearButton.addEventListener("click", (e) => {
      that.clear();
    });
    this.brushSlider.addEventListener("change", (e) => {
      e.preventDefault();
      that.brushSize = Number(e.target.value);
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
        let x = e.pageX - this.canvas.offsetLeft;
        let y = e.pageY - this.canvas.offsetTop;
        let j = Math.floor(x / this.dx);
        let i = Math.floor(y / this.dx);
        let id = this.COLORS.indexOf(this.currentColor);
        this.setNeighborhood(i, j, id, this.currentColor);
        this.render();
      }
    });
    this.canvas.addEventListener("mouseout", (e) => {
      e.preventDefault();
      this.painting = false;
    });
    this.numColorsInput.addEventListener("change", (e) => {
      e.preventDefault();
      this.numColors = e.target.value;
      let newColors = Util.randomSlice(this.numColors);
      that.setColors(newColors);
      that.board.setColors(newColors);
      that.board.createGrid();
      that.render();
      if (e.target.value <= 3) {
        this.board.threshold = 3;
        $("#threshold").val(3);
      } else if (e.target.value <= 8) {
        this.board.threshold = 2;
        $("#threshold").val(2);
      } else {
        this.board.threshold = 1;
        $("#threshold").val(1);
      }
    });
    this.randomColorsButton.addEventListener("click", (e) => {
      e.preventDefault();
      let newColors = Util.randomSlice(this.numColors);
      that.setColors(newColors);
      that.board.setColors(newColors);
      this.board.createGrid();
      that.render();
    });
    this.thresholdInput.addEventListener("change", (e) => {
      e.preventDefault();
      that.board.threshold = e.target.value;
    });
    this.pre1.addEventListener("click", (e) => {
      e.preventDefault();
      this.mode = "rainbow";
      that.numColors = 16;
      $("#num-colors").val(16);
      let newColors = Util.randomSlice(16);
      that.setColors(newColors);
      that.board.setColors(newColors);
      that.board.createGrid();
      that.render();
      this.board.threshold = 1;
      $("#threshold").val(1);
    });
    this.pre2.addEventListener("click", (e) => {
      e.preventDefault();
      this.mode = "rainbow";
      that.numColors = 4;
      $("#num-colors").val(4);
      let newColors = Util.randomSlice(4);
      that.setColors(newColors);
      that.board.setColors(newColors);
      that.board.createGrid();
      that.render();
      this.board.threshold = 2;
      $("#threshold").val(2);
    });
    this.pre3.addEventListener("click", (e) => {
      e.preventDefault();
      this.mode = "rainbow";
      that.numColors = 3;
      $("#num-colors").val(3);
      let newColors = Util.randomSlice(3);
      that.setColors(newColors);
      that.board.setColors(newColors);
      that.board.createGrid();
      that.render();
      this.board.threshold = 3;
      $("#threshold").val(3);
    });
    this.optionsButton.addEventListener("click", (e) => {
      let optionMenu = document.querySelector(".option-menu");
      optionMenu.classList.toggle("options-visible");
    });
    this.paintMenuButton.addEventListener("click", (e) => {
      let paintMenu = document.querySelector(".color-menu");
      paintMenu.classList.toggle("colors-visible");
    });
    this.hideButtons.forEach( button => {
      let eyes = this.eyeButtons;
      let menus = document.querySelectorAll(".menu");
      button.addEventListener("click", (e) => {
        menus.forEach( menu => {
          menu.classList.toggle("dim");
        });
        eyes.forEach( eye => {
          eye.classList.toggle("fa-eye-slash");
          eye.classList.toggle("fa-eye");
        });
      });
    });
  }

  random() {
    this.stop();
    this.board.createGrid();
    this.render();
  }

  setNeighborhood(i, j, id, color) {
    for (let x = i - this.brushSize; x <= i + this.brushSize; x++) {
      for (let y = j - this.brushSize; y <= j + this.brushSize; y++) {
        if (this.board.inBounds(x, y)) {
          let xDist = x - i;
          let yDist = y - j;
          if ((xDist * xDist + yDist * yDist) < (this.brushSize * this.brushSize)) {
            this.board.cells[x][y].color = color;
            this.board.cells[x][y].id = id;
          }
        }
      }
    }
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
      this.running = true;
      this.myInterval = setInterval(this.iterate.bind(this), 50);
    }
  }

  // run() {
  //   this.running = true;
  //   setTimeout(this.runStep.bind(this), 50);
  // }

  runStep() {
    this.iterate();
    if (this.running) {
      setTimeout(this.runStep.bind(this), 300);
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.myInterval);
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
