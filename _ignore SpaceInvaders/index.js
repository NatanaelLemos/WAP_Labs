/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";

    const drawBoard = document.querySelector('.draw-board');
    const player = new Player();

    window.onload = () => {
        const inputBoard = document.getElementById('inputBoard');
        inputBoard.onkeydown = movePlayer;

        inputBoard.onblur = () => inputBoard.focus();
        document.querySelector('*').onfocus = () => inputBoard.focus();
        inputBoard.focus();
    };

    function movePlayer(k) {
        console.log(k.key);

        switch(k.key.toUpperCase()){
            case 'ARROWUP':
                player.x--;
                break;
            case 'ARROWDOWN':
                player.x++;
                break;
        }

        console.log(player.draw());
        console.log(player.x);
        drawBoard.innerHTML = player.draw();
    }
})();