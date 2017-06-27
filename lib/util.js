export const rainbowSlice = (n) => {
  // 255 => '#0000FF'
  // 16711680 => '#FF0000'
  // 16777215 => '#FFFFFF'
  let step = (16711935 - 22015) / (n);
  let colorArray = [];
  for ( let i = 1; i < n; i++ ) {
    colorArray.push( `#${(22015 + Math.floor( step * i )).toString(16)}`);
  }

  return colorArray;
};

export const randomSlice = (n, start) => {
  // 255 => '#0000FF'
  // 16711680 => '#FF0000'
  // 16777215 => '#FFFFFF'
  let offset = start || Math.floor(Math.random() * 10000000);
  let step = (16711680 - offset) / n + 2;
  let colorArray = [];
  for ( let i = 1; i <= n; i++ ) {
    colorArray.push( `#${(offset + Math.floor( step * i )).toString(16)}`);
  }
  return colorArray;
};

export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};


export const paintText = () => {
  let $splash = $("<section class='splash menu about'></section>");
  let $p1 = $("<p></p>").text("Paint help!");
  $splash.append($p1);
  return $splash;
};

export const helpText = () => {
  let $splash = $("<section class='splash menu about'></section>");
  let $cyclicLink = $("<a href=https://en.wikipedia.org/wiki/Cyclic_cellular_automaton>cyclic cellular automata</a>");
  let $mooreLink = $("<a href=https://upload.wikimedia.org/wikipedia/commons/4/4d/Moore_neighborhood_with_cardinal_directions.svg>moore neighborhood. </a>");
  let $s1 = $("<span></span>").text("Breathe is visualization of ")
  let $s2 = $("<span></span>").text(", a concept in math and computer science that describes a grid of cells whose values are determined by the value of their surrounding cells.");
  let $p1 = $("<p></p>").append($s1).append($cyclicLink).append($s2);

  let $s3 = $("<span></span>").text("In cyclic cellular automata, every cell can be in any one of n states.  Each cell remains in its state until a surrounding cell has a modular state 1 above it's own, at which point it copies that state.  In this implementation, the states are represented by colors, and the 'surrrounding' cells are considered the cell's ");
  let $p2 = $("<p></p>").append($s3).append($mooreLink);

  let $p3 = $("<p></p>").text("For example, let's say we have 3 possible states: Red, Green, and Blue.  Each iteration, a red cell will become green if there is a green cell in any of the 8 cells surrounding it.  A green cell will become blue if it has a blue cell in any of the 8 cells surrounding it, and any blue cell will become red if it has a red cell in any of the surrounding 8 cells.");

  let $p4 = $("<p></p>").text("One variation is to add a 'threshold', a second constraint that means a cell will only be 'consumed' by it's surrounding cell if it has N neighbor cells with the appropriate state.  In our previous example, with a threshold of 2, means that a red cell will only become green if it has 2 green neighbor cells.");

  let $p5 = $("<p></p>").text("Breathe is a javascript implementation of this concept that explores the relationship between number of states and threshold.");
  $splash.append($("<h1>What is this?</h1>"))
  $splash.append($p1);
  $splash.append($p2);
  $splash.append($p3);
  $splash.append($p4);
  $splash.append($p5);
  return $splash;
};
