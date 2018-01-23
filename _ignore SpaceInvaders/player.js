/* jshint esversion: 6 */
/* jshint browser: true */
class Player {
    constructor() {
        this._x = 0;
    }

    set x(value) {
        if(value < 0) {
            value = 0;
        } else if (value )
        this._x = value;
    }

    get x() {
        return this._x;
    }

    draw() {
        let player = "|\n" +
                    "|\n" +
                    "|";

        for(let i = 0; i < this.x; i++) {
            player = `\n${player}`;
        }

        return player;
    }
}

