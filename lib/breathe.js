import Board from './board';
import BoardView from './boardView';

document.addEventListener('DOMContentLoaded', () => {
  let density = 150;
  let canvas = document.getElementById('canvasEl');
  let ctx = canvas.getContext("2d");
  let board = new Board(density);
  let boardView = new BoardView(ctx, density, board);
});
