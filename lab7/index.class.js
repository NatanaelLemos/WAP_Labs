/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";

    class Bicycle {
        constructor() {
            this.speed = 0;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }

        applyBreak(decrement) {
            this.speed -= decrement;
        }

        speedUp(increment) {
            this.speed += increment;
        }
    }

    class MountainBike extends Bicycle {
        constructor() {
            super();
            this.gear = 1;
        }

        get gear() {
            return this._gear;
        }

        set gear(value) {
            this._gear = value;
        }

        setGear(currGear){
            this.gear = currGear;
        }
    }

    function start() {
        console.log('Constructor');

        const bikeList = [
            new Bicycle(),
            new MountainBike(),
            new Bicycle(),
            new MountainBike(),
            new Bicycle(),
            new MountainBike()
        ];

        for (let i = 0; i < 10; i++) {
            console.log('speed up');
            for (const bike of bikeList) {
                bike.speedUp(2);
                console.log(bike.speed);
            }
            console.log('speed down');
            for (const bike of bikeList) {
                bike.applyBreak(1);
                console.log(bike.speed);
            }
            console.log('change gear');
            for (const bike of bikeList) {
                if (bike instanceof MountainBike) {
                    bike.setGear(3);
                    console.log(bike.gear);
                }
            }
        }
    }

    window.onload = start;
})();