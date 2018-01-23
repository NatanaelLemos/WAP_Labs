/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";

    function Bicycle() {
        this.speed = 0;

        this.applyBreak = function (decrement) {
            this.speed -= decrement;
        };

        this.speedUp = function (increment) {
            this.speed += increment;
        };
    }

    function MountainBike() {
        this.gear = 1;

        this.setGear = function (currGear) {
            this.gear = currGear;
        };
    }

    MountainBike.prototype = new Bicycle();

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

        for (let i = 0; i < 10; i ++ ) {
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