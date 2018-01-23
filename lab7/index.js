/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
"use strict";

    function createBicyclePrototype () {
        return {
            speed: 0,
            applyBreak: function(decrement) {
                this.speed -= decrement;
            },
            speedUp: function(increment) {
                this.speed += increment;
            }
        };
    }

    function createMountainBikePrototype (prototype) {
        const obj = Object.create(prototype);
        obj.gear = 1;
        obj.setGear = function(currGear) {
            this.gear = currGear;
        };

        return obj;
    }

    function start() {
        const bicyclePrototype = createBicyclePrototype();
        const mountainBikePrototype = createMountainBikePrototype(bicyclePrototype);

        const bikeList = [
            Object.create(bicyclePrototype),
            Object.create(mountainBikePrototype),
            Object.create(bicyclePrototype),
            Object.create(mountainBikePrototype),
            Object.create(bicyclePrototype),
            Object.create(mountainBikePrototype)
        ];

        for(let i = 0; i < 10; i++) {
            console.log('speed up');
            for(const bike of bikeList) {
                bike.speedUp(2);
                console.log(bike.speed);
            }
            console.log('speed down');
            for(const bike of bikeList) {
                bike.applyBreak(1);
                console.log(bike.speed);
            }
            console.log('change gear');
            for(const bike of bikeList) {
                if(bike.__proto__ === mountainBikePrototype){
                    bike.setGear(3);
                    console.log(bike.gear);
                }
            }
        }
    }

    window.onload = start;
})();