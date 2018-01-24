/* jshint esversion: 6 */
/* jshint browser: true */
$(() => {
    "use strict";
    const balls = [];

    function update() {
        for(let ball of balls){
            ball.velocity += 1;
            if (parseInt(ball.element.css('top')) > $(window).height()) {
                ball.velocity *= -.9;
                balls.push(createNewBall());
            }

            ball.element.css('top', function (idx, old) {
                return parseInt(old) + ball.velocity + 'px';
            });
        }
    }

    function position() {
        const randomPos = 1 + Math.floor(Math.random() * 20);
        return `${($(window).width() / randomPos) - 20}px`;
    }

    function color() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return `rgb(${r},${g},${b})`;
    }

    function createNewBall() {
        const ball = $('<div>', {
            'class': 'ball',
            'css': {
                'left': position(),
                'background-color': color()
            }
        });

        $('body').prepend(ball);

        return {
            velocity: 0,
            element: ball
        };
    }

    balls.push(createNewBall());
    setInterval(update, 20);
});