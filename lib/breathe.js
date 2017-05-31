import Board from './board';
import BoardView from './boardView';
import * as Util from './util';

document.addEventListener('DOMContentLoaded', () => {
  let density = 150;
  // let COLORS = ["#F00", "#0F0", "#00F"];
  // let COLORS = [
  //   '#FF0000',
  //   '#FF5500',
  //   '#FFAA00',
  //   '#FFFF00',
  //   '#AAFF00',
  //   '#55FF00',
  //   '#00FF00',
  //   '#00FF55',
  //   '#00FFAA',
  //   '#00FFFF',
  //   '#00AAFF',
  //   '#0055FF',
  //   '#0000FF',
  //   '#5500FF',
  //   '#AA00FF',
  //   '#FF00FF',
  // ];
  let COLORS = Util.randomSlice(16);
  console.log(Util.rainbowSlice(3));
  let canvas = document.getElementById('canvasEl');
  let ctx = canvas.getContext("2d");
  let board = new Board(density, COLORS);
  let boardView = new BoardView(canvas, ctx, density, board, COLORS);
});
