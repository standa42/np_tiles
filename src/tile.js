import { Color } from "./color.js"

export class Tile {
    constructor(downTile, rightTile) {
        // console.log("tile constuctor", downTile, rightTile)
        if(downTile != null)
            this.down = downTile.up
        else
            this.down = Color.generateRandomColor()
        
        if(rightTile != null)
            this.right = rightTile.left
        else
            this.right = Color.generateRandomColor()

        this.left = Color.generateRandomColor()
        this.up = Color.generateRandomColor()
        // console.log("tile constuctor", this.up, this.left, this.right, this.down)
    }

    rotateRight() {
        let temp = this.up
        this.up = this.left
        this.left = this.down
        this.down = this.right
        this.right = temp
    }

     match(rightTile, downTile) {
        let match = true
        let count = 0
        let matchCount = 0

        if(rightTile != null) {
            match = match && rightTile.left == this.right
            count++
            if(rightTile.left == this.right)
                matchCount++
        }
            
        if(downTile != null) {
            match = match && downTile.up == this.down
            count++
            if(downTile.up == this.down)
                matchCount++
        }
            
        return [match, count, matchCount]
    }
}