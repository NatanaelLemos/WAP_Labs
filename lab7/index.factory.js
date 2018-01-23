/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";

    function BicycleFactory() {
        function Bicycle() {
            this.speed = 0;
        }

        Bicycle.prototype.applyBreak = function (decrement) {
            this.speed -= decrement;
        };

        Bicycle.prototype.speedUp = function (increment) {
            this.speed += increment;
        };

        function MountainBike() {
            this.gear = 1;
        }

        MountainBike.prototype = new Bicycle();
        MountainBike.prototype.setGear = function (currGear) {
            this.gear = currGear;
        };

        return {
            createBicycle: () => new Bicycle(),
            createMountainBike: () => new MountainBike()
        };
    }

    function start() {
        console.log('Factory');

        const bikeFactory = new BicycleFactory();

        const bikeList = [
            bikeFactory.createBicycle(),
            bikeFactory.createMountainBike(),
            bikeFactory.createBicycle(),
            bikeFactory.createMountainBike(),
            bikeFactory.createBicycle(),
            bikeFactory.createMountainBike()
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
                if (bike.setGear) {
                    bike.setGear(3);
                    console.log(bike.gear);
                }
            }
        }
    }

    window.onload = start;
})();