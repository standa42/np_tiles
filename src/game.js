import Vector from "vectory-lib"
import { Tile } from "./tile"
import { Color } from "./color"

export class Game {

    constructor(p) {        
        this.tileSize = 150 // px
        this.tiles = null
        this.gameSize = null
        
        this.initLevel(p)
    }

    initLevel(p) {
        if(this.gameSize == null)
            this.gameSize = new Vector(2, 2)
        if(this.gameSize.x == 1 && this.gameSize.y == 1)
            this.gameSize = new Vector(2, 1)

        p.resizeCanvas(this.gameSize.x * this.tileSize, this.gameSize.y * this.tileSize);

        this.populateLevel()
    }

    populateLevel() {
        // init arrays
        this.tiles = Array.from({ length: this.gameSize.x }, () => 
          Array.from({ length: this.gameSize.y }, () => null)
        );

        // populate with meaningfull tiles
        for(let y = 0; y < this.gameSize.y; y++) {
            for(let x = 0; x < this.gameSize.x; x++) {
                let rightTile = x-1 >= 0 ? this.tiles[x-1][y] : null
                let downTile = y-1 >= 0 ? this.tiles[x][y-1] : null
                this.tiles[x][y] = new Tile(downTile, rightTile)
            }
        }

        do {
            this.reshuffle()
        } while(this.checkWin())
    }

    reshuffle() {
        for(let i = 0; i < 100; i++){
            for(let x = 0; x < this.gameSize.x; x++) {
                for(let y = 0; y < this.gameSize.y; y++) {
                    let randomX = Math.floor(Math.random() * this.gameSize.x)
                    let randomY = Math.floor(Math.random() * this.gameSize.y)
                    let temp = this.tiles[x][y]
                    this.tiles[x][y] = this.tiles[randomX][randomY]
                    this.tiles[randomX][randomY] = temp

                    if (Math.random() > 0.5)
                        this.tiles[x][y].rotateRight()
                }
            }
        }
    }

    render (p) {
        // render tiles in a square grid as tiles of size tileSize as colored tiles in p5 where each tile has 4 colors
        for(let x = 0; x < this.gameSize.x; x++) {
            for(let y = 0; y < this.gameSize.y; y++) {
                let rightBottom = new Vector(x * this.tileSize, y * this.tileSize)
                let leftBottom = new Vector(x * this.tileSize + this.tileSize, y * this.tileSize)
                let leftTop = new Vector(x * this.tileSize + this.tileSize, y * this.tileSize + this.tileSize)
                let rightTop = new Vector(x * this.tileSize, y * this.tileSize + this.tileSize)
                let center = new Vector(x * this.tileSize + this.tileSize / 2, y * this.tileSize + this.tileSize / 2)
                
                let tile = this.tiles[x][y]

                p.fill(...Color.getColorFromString(tile.down))
                p.triangle(leftBottom.x, leftBottom.y, rightBottom.x, rightBottom.y, center.x, center.y)
                p.fill(...Color.getColorFromString(tile.right))
                p.triangle(rightBottom.x, rightBottom.y, rightTop.x, rightTop.y, center.x, center.y)
                p.fill(...Color.getColorFromString(tile.up))
                p.triangle(rightTop.x, rightTop.y, leftTop.x, leftTop.y, center.x, center.y)
                p.fill(...Color.getColorFromString(tile.left))
                p.triangle(leftTop.x, leftTop.y, leftBottom.x, leftBottom.y, center.x, center.y)
            }
        }    
    }

    checkWin() {
        let correct = 0
        let all = 0

        let match = true
        for(let x = 0; x < this.gameSize.x; x++) {
            for(let y = 0; y < this.gameSize.y; y++) {
                let rightTile = x-1 >= 0 ? this.tiles[x-1][y] : null
                let downTile = y-1 >= 0 ? this.tiles[x][y-1] : null
                let tile = this.tiles[x][y]
                const [currentTileMatch, count, matchCount] = tile.match(rightTile, downTile)
                match = match && currentTileMatch
                console.log(correct, all, matchCount, count, match)
                correct += matchCount
                all += count
            }
        }
        document.getElementById("score").innerHTML = `Correct out of all: ${correct}/${all} = ${Math.round(correct/all*100)}% ${correct==all ? "✔️" : ""}`
        document.getElementById("colorsCountText").innerHTML = `Colors: ${Color.Count}`

        let tileCount = this.gameSize.x * this.gameSize.y
        function factorial(x) {return (x > 1) ? x * factorial(x-1) : 1;}
        let permutationsOfTileCount = factorial(tileCount)
        let rotationsOfTileCount = 4 ** tileCount
        let allOptions = permutationsOfTileCount * rotationsOfTileCount
        document.getElementById("stats").innerHTML = `All possible configurations ~ ${allOptions}`

        return match
    }

    click (x, y) {
        // index tiles based on position in squared grid of size tileSizes
        let tileX = Math.floor(x / this.tileSize)
        let tileY = Math.floor(y / this.tileSize)
        self.tiles = this.tiles[tileX][tileY].rotateRight()
    }

    move (x1, y1, x2, y2) {
        // swap two tiles based on position in squared grid of size tileSizes
        let tileX1 = Math.floor(x1 / this.tileSize)
        let tileY1 = Math.floor(y1 / this.tileSize)
        let tileX2 = Math.floor(x2 / this.tileSize)
        let tileY2 = Math.floor(y2 / this.tileSize)

        let temp = this.tiles[tileX1][tileY1]
        this.tiles[tileX1][tileY1] = this.tiles[tileX2][tileY2]
        this.tiles[tileX2][tileY2] = temp
    }    

    swap (tile1, tile2) {
        let temp = this.tiles[tile1.x][tile1.y]
        this.tiles[tile1.x][tile1.y] = this.tiles[tile2.x][tile2.y]
        this.tiles[tile2.x][tile2.y] = temp
    }
}