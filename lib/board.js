import Cell from './cell';
import { merge } from 'lodash';

class Board {
  constructor(density) {
    this.density = density;
    this.cells = [];
    this.COLORS = [
      '#FF0000',
      '#FF5500',
      // '#FFAA00',
      '#FFFF00',
      '#AAFF00',
      // '#55FF00',
      '#00FF00',
      '#00FF55',
      '#00FFAA',
      // '#00FFFF',
      '#00AAFF',
      '#0055FF',
      '#0000FF',
      // '#5500FF',
      '#AA00FF',
      '#FF00FF'
    ];
    this.createGrid();
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
    for (let iPrime = i - 1; iPrime <= i + 1; iPrime++) {
      for (let jPrime = j - 1; jPrime <= j + 1; jPrime++) {
        if (this.inBounds(iPrime, jPrime)) {
          if (this.isSuccessor(this.cells[iPrime][jPrime], cell)) {
            let id = (cell.id + 1) % this.COLORS.length;
            let color = this.COLORS[id];
            this.cells[i][j].update(id, color);
            return;
          }
        }
      }
    }
  }

  isSuccessor(neighbor, cell) {
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
