import Board from './board';
import BoardView from './boardView';

document.addEventListener('DOMContentLoaded', () => {
  let density = 100;
  let canvas = document.getElementById('canvasEl');
  let ctx = canvas.getContext("2d");
  // let board = new Board(ctx, density);
  let boardView = new BoardView(ctx, density);
});
