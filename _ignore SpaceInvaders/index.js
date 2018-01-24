/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";

    const drawBoard = document.querySelector('.draw-board');
    const player = new Player();

    window.onload = () => {
        bindEvents();
        inputBoard.focus();

        setInterval(() => {
            drawBoard.innerHTML = player.draw();
        }, 10);
    };

    function bindEvents() {
        const inputBoard = document.getElementById('inputBoard');
        inputBoard.onkeydown = movePlayer;

        inputBoard.onblur = () => inputBoard.focus();
        document.querySelector('*').onfocus = () => inputBoard.focus();
    }

    function movePlayer(k) {
        switch(k.key.toUpperCase()){
            case 'ARROWUP':
                player.x--;
                break;
            case 'ARROWDOWN':
                player.x++;
                break;
        }
    }
})();