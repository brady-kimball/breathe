# Breathe

[Breathe live](https://brady-kimball.github.io/breathe/)

## Background

Breathe is visualization of [cyclic cellular automata](https://en.wikipedia.org/wiki/Cyclic_cellular_automaton), a concept in math and computer science that describes a grid of cells whose values are determined by the value of their surrounding cells.

In *cyclic* cellular automata, every cell can be in any one of n states.  Each cell remains in its state until a surrounding cell has a modular state 1 above it's own, at which point it copies that state.  In this implementation, the states are represented by colors, and the "surrrounding" cells are considered the cell's [moore neighborhood](https://upload.wikimedia.org/wikipedia/commons/4/4d/Moore_neighborhood_with_cardinal_directions.svg).

For example, let's say we have 3 possible states: Red, Green, and Blue.  Each iteration, a red cell will become green if there is a green cell in any of the 8 cells surrounding it.  A green cell will become blue if it has a blue cell in any of the 8 cells surrounding it, and any blue cell will become red if it has a red cell in any of the surrounding 8 cells.

One variation is to add a "threshold", a second constraint that means a cell will only be "consumed" by it's surrounding cells if it has N neighbor cells with the appropriate state.  In our previous example, with a threshold of 2, means that a red cell will only become green if it has **2** green neighbor cells.

Breathe is a javascript implementation of this concept that explores the relationship between number of states and threshold.  

## Technologies

Elucidate is built strictly using Javascript, jQuery, HTML5 Canvas and CSS3. The grid, cell objects, and all the logic is done in Javascript. jQuery is used for DOM manipulation, and the element rendering and painting are both done using HTML5 canvas.

## Features & Implementation

* Start, stop, or step simulations from an initial state
* Supports 3 to 16 unique colors with a threshold from 1 to 4
* User can paint on the canvas
  * Can start from a fresh canvas
  * Can paint while the simulation is running
  * Can choose for simulation to pause while the mouse is down, or paint "live"
* Supports manipulation of threshold parameter while the simulation is running.

### Simulation

![alt-text](/assets/16-1.gif "It's alive!")

Users have full control over the simulation as it starts from a random initial configuration and develops into its final repeating pattern.  

### Live Parameter Control

![alt-text](/assets/change-parameters.gif)

Using the arrow keys, users can manipulate the parameters as the simulation runs to explore the relationship between threshold, number of colors, and the output.

### Make a splash!

![alt-text](assets/paint2.gif)

With the paint menu, users can modify the simulation as it runs.  An additional option exists to have the simulation pause while you paint, or react live to the inputs of the user.

### Explore your inner artist

![alt-text](assets/paint.gif)

If they desire, a user can clear the canvas and create their own art, change the parameters, and see what they can create!

## Future Improvements

* Add slider to manipulate the density
* Add slider to change render speed
