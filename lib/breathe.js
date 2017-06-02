import Board from './board';
import BoardView from './boardView';
import * as Util from './util';

document.addEventListener('DOMContentLoaded', () => {
  let density = 175;
  let COLORS = [
    "#532cf1",
    "#8c734e",
    "#c5b9ab",
    "#ff0008"
  ];
  let canvas = document.getElementById('canvasEl');
  let ctx = canvas.getContext("2d");
  let board = new Board(density, COLORS);
  let boardView = new BoardView(canvas, ctx, density, board, COLORS);
});
