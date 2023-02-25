import p5 from "p5"

import { Game } from "./game";
import Vector from "vectory-lib"

// document.addEventListener('contextmenu', event => event.preventDefault());

var game = null

var startPosition = null
var drag = 0
var startTileCoordinates = null
var startTime = null
  

var sketch = (p) => {

  p.setup = () => {
    let canvas = p.createCanvas(100, 100);
    canvas.parent('#canvasHolder')
    game = new Game(p)
    p.frameRate(30);
    game.render(p)
  };

  p.draw = () => {
  };
  
  p.mousePressed = () => {
    drag = null
    startPosition = new Vector(p.mouseX, p.mouseY)
    startTileCoordinates = new Vector(Math.floor(p.mouseX / game.tileSize), Math.floor(p.mouseY / game.tileSize))
    startTime = new Date()
  }

  p.mouseDragged = () => {
    drag = drag + 1
  }

  p.mouseReleased = () => {
    let endPosition = new Vector(p.mouseX, p.mouseY)
    let endTileCoordinates = new Vector(Math.floor(p.mouseX / game.tileSize), Math.floor(p.mouseY / game.tileSize))    

    // check that startTileCoordinates and endTileCoordinates fits within square defined by game.gameSize * game.tileSize, if not return without doing anything
    if(startTileCoordinates.x < 0 || startTileCoordinates.x >= game.gameSize.x || startTileCoordinates.y < 0 || startTileCoordinates.y >= game.gameSize.y ||
      endTileCoordinates.x < 0 || endTileCoordinates.x >= game.gameSize.x || endTileCoordinates.y < 0 || endTileCoordinates.y >= game.gameSize.y)
      return
    
    if(drag <= 10 && (new Date() - startTime) < 200) {
      game.tiles[startTileCoordinates.x][startTileCoordinates.y].rotateRight()
    }
    else {
      game.swap(startTileCoordinates, endTileCoordinates)
    }

    drag = 0
    startTileCoordinates = null
    startPosition = null

    if(game.checkWin())
      game.initLevel(p)

    game.render(p)
  }

  document.getElementById("regenerateButton").addEventListener("click", () => {
    game.initLevel(p)
    game.render(p)
  })

  document.getElementById("xAxisMinus").addEventListener("click", () => {
    if(game.gameSize.x > 1) {
      game.gameSize = new Vector(game.gameSize.x-1, game.gameSize.y)
      game.initLevel(p)
      game.render(p)
    }
  })

  document.getElementById("xAxisPlus").addEventListener("click", () => {
    game.gameSize = new Vector(game.gameSize.x+1, game.gameSize.y)
    game.initLevel(p)
    game.render(p)
  })

  document.getElementById("yAxisMinus").addEventListener("click", () => {
    if(game.gameSize.y > 1) {
      game.gameSize = new Vector(game.gameSize.x, game.gameSize.y-1)
      game.initLevel(p)
      game.render(p)
    }
  })

  document.getElementById("yAxisPlus").addEventListener("click", () => {
    game.gameSize = new Vector(game.gameSize.x, game.gameSize.y+1)
    game.initLevel(p)
    game.render(p)
  })

};

new p5(sketch);
