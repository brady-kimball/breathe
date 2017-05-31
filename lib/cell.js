class Cell {
  constructor(id = 0, color = "#000") {
    this.id = id;
    this.color = color;
    this.nextColor = null;
    this.nextId = null;
  }

  reset() {
    this.id = -1;
    this.color = "#fff";
    this.nextColor = null;
    this.nextId = null;
  }

  update(id, color) {
    this.nextId = id;
    this.nextColor = color;
  }

  render() {
    this.color = this.nextColor || this.color;
    if (!(this.nextId === null)) {
      this.id = this.nextId;
    }
    this.nextId = null;
    this.nextColor = null;
  }
}

export default Cell;
