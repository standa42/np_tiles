import { Color } from "./color.js"

export class Tile {
    constructor(downTile, rightTile) {
        this._initTileColors(downTile, rightTile)
    }

    _initTileColors(downTile, rightTile) {
        // match tile color if there is a neighbor
        this.down = downTile != null ? downTile.up : Color.generateRandomColor()
        this.right = rightTile != null ? rightTile.left : Color.generateRandomColor()

        // generate random colors for the rest
        this.left = Color.generateRandomColor()
        this.up = Color.generateRandomColor()
    }

    rotateRight() {
        const temp = this.up
        this.up = this.left
        this.left = this.down
        this.down = this.right
        this.right = temp
    }

    // TODO: take this from tile to grid, because grid should have overview of the mutual positions of tiles
    match(rightTile, downTile) {
        let neighborCount = 0
        let neighborColorMatchCount = 0

        if(rightTile != null) {
            neighborCount++
            if(rightTile.left == this.right)
                neighborColorMatchCount++
        }
            
        if(downTile != null) {
            neighborCount++
            if(downTile.up == this.down)
                neighborColorMatchCount++
        }
            
        return [neighborCount, neighborColorMatchCount]
    }
}