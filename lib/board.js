class Board {
  constructor(ctx, density) {
    this.ctx = ctx;
    this.density = density;
    this.cells = [];

    this.createGrid();
  }

  createGrid() {
    for (let i = 0; i < this.density; i++) {
      this.cells.push([]);
      for (let j = 0; j < this.density; j++) {
        this.cells[i].push()
      }
    }
  }


}
