import Cell from './cell';
import { merge } from 'lodash';

class Board {
  constructor(density, colors) {
    this.density = density;
    this.cells = [];
    this.COLORS = colors;
    this.createGrid();
    this.threshold = 2;
  }

  setColors(colors) {
    this.COLORS = colors;
  }

  createGrid() {
    this.cells = [];
    for (let i = 0; i < this.density; i++) {
      this.cells.push([]);
      for (let j = 0; j < this.density; j++) {
        let randInfo = this.randColor();
        this.cells[i].push(new Cell(randInfo[0], randInfo[1]));
      }
    }
  }

  clearGrid() {
    for (let i = 0; i < this.density; i++) {
      for (let j = 0; j < this.density; j++) {
        this.cells[i][j].reset();
      }
    }
  }

  randColor() {
    let id = Math.floor(Math.random() * this.COLORS.length);
    return [id, this.COLORS[id]];
  }

  updateColors(cb) {
    for (let i = 0; i < this.density; i++) {
      for (let j = 0; j < this.density; j++) {
        this.checkColors(i, j);
      }
    }
    this.registerChanges();
    if (cb) {
      cb.call();
    }
  }

  registerChanges() {
    for (let i = 0; i < this.density; i++) {
      for (let j = 0; j < this.density; j++) {
        this.cells[i][j].render();
      }
    }
  }

  checkColors(i, j) {
    let cell = this.cells[i][j];
    let neighbors = 0;
    for (let iPrime = i - 1; iPrime <= i + 1; iPrime++) {
      for (let jPrime = j - 1; jPrime <= j + 1; jPrime++) {
        if (this.inBounds(iPrime, jPrime)) {
          if (this.isSuccessor(this.cells[iPrime][jPrime], cell)) {
            neighbors += 1;
            if (neighbors >= this.threshold) {
              let id = (cell.id + 1) % this.COLORS.length;
              let color = this.COLORS[id];
              this.cells[i][j].update(id, color);
              return;
            }
          }
        }
      }
    }
  }


  isSuccessor(neighbor, cell) {
    if ((cell.id === -1) && (neighbor.id !== -1)) {
      return true;
    }
    return (neighbor.id === (cell.id + 1) % this.COLORS.length);
  }

  inBounds(i, j) {
    if (i < 0 || j < 0 || i >= this.density || j >= this.density) {
      return false;
    }
    return true;
  }
}

export default Board;
