export class Color{
    static Count = 0

    static generateRandomColor() {
        Color._safeCheckColorCount()
        return this._getRandomInt(Color.Count) 
    }

    static getColorRGBFromNumber(colorNumber) {
        return this.getColorRGBFromString(this.getColorStringFromNumber(colorNumber))
    }

    static getColorRGBFromString(colorString) {
        return Color.colorsStrings[colorString]
    }

    static getColorStringFromNumber(colorNumber) {
        return Color.colorsNumbers[colorNumber]
    }

    static _safeCheckColorCount() {
        if(Color.Count == null || Color.Count == undefined || Color.Count < 2)    
            Color.Count = 6
    }

    static _getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static colorsStrings = {  
        "dark blue": [0, 114, 198],
        "light gray": [229, 229, 229],
        "dark gray": [51, 51, 51],
        "yellow": [255, 194, 14],
        "bright green": [93, 210, 99],
        "coral": [255, 80, 73],
        "light blue": [154, 213, 229],
        "dark green": [0, 139, 139],
        "peach": [255, 229, 180],
        "lavender": [216, 191, 216],
    }
    
    static colorsNumbers = {
        0: "dark blue",
        1: "light gray",
        2: "dark gray",
        3: "yellow",
        4: "bright green",
        5: "coral",
        6: "light blue",
        7: "dark green",
        8: "peach",
        9: "lavender",
    }
}