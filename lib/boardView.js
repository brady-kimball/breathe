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
    this.currentColor = colors[0];
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
    this.pausePaintButton = document.getElementById("pause-paint");
    this.bindHandlers();
    this.render();
    this.populateColors();
    this.brushSize = 2;
    this.speed = 50;
    this.numColors = 4;
    this.pausePaint = true;
  }

  setColors(colors) {
    this.COLORS = colors;
    this.populateColors();
    this.currentColor = this.COLORS[0];
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
      that.painting = true;
      if (that.running && that.pausePaint) {
        that.stop();
        that.flagRun = true;
      }
    });
    this.canvas.addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.painting = false;
      if (that.flagRun) {
        that.run();
        that.flagRun = false;
      }
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
      if (that.flagRun) {
        that.run();
        that.flagRun = false;
      }
    });
    this.numColorsInput.addEventListener("change", (e) => {
      e.preventDefault();
      that.setNumColors(e.target.value);
      that.board.createGrid();
      that.render();
      if (e.target.value <= 3) {
        that.setThreshold(3);
      } else if (e.target.value <= 8) {
        that.setThreshold(2);
      } else {
        that.setThreshold(1);
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
      // that.board.threshold = e.target.value;
      this.setThreshold(e.target.value);
    });
    this.pre1.addEventListener("click", (e) => {
      e.preventDefault();
      this.mode = "rainbow";
      that.setNumColors(16);
      that.board.createGrid();
      that.render();
      that.setThreshold(1);
    });
    this.pre2.addEventListener("click", (e) => {
      e.preventDefault();
      this.mode = "rainbow";
      that.setNumColors(4);
      that.board.createGrid();
      that.render();
      that.setThreshold(2);
    });
    this.pre3.addEventListener("click", (e) => {
      e.preventDefault();
      this.mode = "rainbow";
      that.setNumColors(3);
      that.board.createGrid();
      that.render();
      that.setThreshold(3);
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
    this.pausePaintButton.addEventListener("change", (e) => {
      e.preventDefault();
      this.pausePaint = e.target.checked;
      console.log(this.pausePaint);
    });
    window.addEventListener("keydown", (e) => {
      console.log("nice");
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 37:
          if (!(this.numColors < 4)) {
            this.setNumColors(this.numColors - 1);
            that.board.createGrid();
            that.render();
            if (this.numColors <= 3) {
              that.setThreshold(3);
            } else if (this.numColors <= 8) {
              that.setThreshold(2);
            } else {
              that.setThreshold(1);
            }
          }
          return;
        case 39:
          if (!(this.numColors > 15)) {
            this.setNumColors(this.numColors + 1);
            that.board.createGrid();
            that.render();
            if (this.numColors <= 3) {
              that.setThreshold(3);
            } else if (this.numColors <= 8) {
              that.setThreshold(2);
            } else {
              that.setThreshold(1);
            }
          }
          return;
        case 38:
          if (this.board.threshold < 4) {
            this.setThreshold(this.board.threshold + 1);
          }
          return;
        case 40:
          if (this.board.threshold > 1) {
            this.setThreshold(this.board.threshold - 1);
          }
          return;
        case 32:
          if (this.running) {
            this.stop();
          } else {
            this.run();
          }
      }
    });
  }

  random() {
    this.stop();
    this.board.createGrid();
    this.render();
  }

  setNumColors(num) {
    this.numColors = num;
    $("#num-colors").val(num);
    let newColors = Util.randomSlice(num);
    document.querySelector(".num-counter .counter").innerHTML = num;
    this.setColors(newColors);
    this.board.setColors(newColors);
  }

  setThreshold(num) {
    this.board.threshold = num;
    $("#threshold").val(num);
    document.querySelector(".thresh-counter .counter").innerHTML = num;
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
      setTimeout(this.runStep.bind(this), 100);
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
