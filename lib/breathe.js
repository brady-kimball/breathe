import Board from './board';
import BoardView from './boardView';
import * as Util from './util';

document.addEventListener('DOMContentLoaded', () => {
  let density = 175;
  let COLORS = [
    "#765d82",
    "#7f796a",
    "#889553",
    "#91b13b",
    "#9acd23",
    "#a3e90c",
    "#ad04f4",
    "#b620dd",
    "#bf3cc5",
    "#c858ad",
    "#d17496",
    "#da907e",
    "#e3ac66",
    "#ecc84f",
    "#f5e437",
    "#ff0020",
  ];
  let canvas = document.getElementById('canvasEl');
  let ctx = canvas.getContext("2d");
  let board = new Board(density, COLORS);
  let boardView = new BoardView(canvas, ctx, density, board, COLORS);
});
