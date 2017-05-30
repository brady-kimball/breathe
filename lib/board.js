import Cell from './cell';

class Board {
  constructor(density) {
    this.density = density;
    this.cells = [];
    this.COLORS = ['#FF0000', '#00FF00', '#0000FF'];
    this.createGrid();
  }

  createGrid() {
    for (let i = 0; i < this.density; i++) {
      this.cells.push([]);
      for (let j = 0; j < this.density; j++) {
        this.cells[i].push(new Cell(this.randColor()));
      }
    }
  }

  randColor() {
    return this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
  }
}

export default Board;
