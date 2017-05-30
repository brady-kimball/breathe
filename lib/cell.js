class Cell {
  constructor(id = null, color = null) {
    this.id = id;
    this.color = color;
    this.nextColor = null;
    this.nextId = null;
  }

  reset() {
    this.id = null;
    this.color = null;
    this.nextColor = null;
    this.nextId = null;
  }

  update(id, color) {
    this.nextId = id;
    this.nextColor = color;
  }

  render() {
    this.color = this.nextColor;
    this.id = this.nextId;
  }
}

export default Cell;
