# Breathe

## Background

Breathe is an example of a cellular automaton, a concept in math and computer science that describes a grid of cells whose values are determined by the value of their surrounding cells. One of the most common examples of this concept is Conway's Game of Life.  

In Conway's game of life, a rectangular grid contains cells that start out as either "alive" or "dead", visualized as white or black.  When the game begins, each cell updates according to the following three rules:

* Any live cell with less than 2 alive neighbors, or more than 3 alive neighbors dies
* Any live cell with exactly 2 or 3 neighbors lives
* A dead cell with exactly 3 neighbors comes to life

The grid then keeps updating and rerendering based on these rules.  

Breathe is a javascript implementation of a variation of Conway's Game of Life.  

The variations are described below.

## Functionality and MVP

- [] Play, Pause and Reset buttons for the game board
- Click to select initial state of the board
- Default set of rules for the cells to follow
- Interactively change the rules for a given color
- Extra functionality:
  - Choose number of colors
  - speed of steps
  - 'Paint mode' to paint the board while it's rendering
  - User can edit density of grid

## Wireframe

![wireframe](app/assets/images/Breathe.png)

The app will consist of a single page.  The grid will be in the center, with nav links on the bottom.  Above the grid will be where the user can set/edit rules for each color.  

## Technologies, plugins and APIs
