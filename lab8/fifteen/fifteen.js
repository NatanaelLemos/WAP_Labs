/* jshint esversion: 6 */
/* jshint browser: true */

$(() => {
    "use strict";

    const _matrixSize = 4;
    const _blockSize = 100;

    const game = {
        matrix: [],
        preload: () => {
            //Fill the matrix with empty space (0)
            for (let i = 0; i < _matrixSize; i++) {
                game.matrix.push([]);

                for (let j = 0; j < _matrixSize; j++) {
                    game.matrix[i].push(0);
                }
            }

            //For each html piece, add the specified class and bind the events
            $('#puzzlearea div')
                .addClass('puzzlepiece')
                .click(game.clickEvent)
                .mouseover(game.hoverEvent)
                .each((idx, el) => { //For each html piece, change the background and draw it on the screen
                    const x = parseInt(idx % _matrixSize);
                    const y = parseInt(idx / _matrixSize);
                    const block = $(el).css('background', `url("background.jpg") -${_blockSize * x}px -${_blockSize * y}px`);
                    game.drawBlock(block, x, y);
                });
        },
        clickEvent: (e) => {
            let $target = $(e.target);

            //Store the current position of the piece
            const oldPosition = {
                x: $target.data('x'),
                y: $target.data('y')
            };

            //From the old position, find a new one
            const newPosition = game.findNearestEmptyPosition(oldPosition.x, oldPosition.y);
            if (!newPosition) return; //If the new position is null, it's impossible to move

            //Clear the old position on the matrix
            game.matrix[oldPosition.y][oldPosition.x] = 0;

            //Fill the matrix with the new position
            game.drawBlock($target, newPosition.x, newPosition.y);
        },
        hoverEvent: (e) => {
            const $target = $(e.target);
            if (game.canMove($target)) {
                $target.addClass('movablepiece');
            } else {
                $target.removeClass('movablepiece');
            }
        },
        drawBlock: (block, x, y) => {
            //Draw the piece on the screen
            block.css({
                'left': `${x * _blockSize}px`,
                'top': `${y * _blockSize}px`,
            });

            //Set it's position in the matrix
            game.matrix[y][x] = 1;

            //Store the position on the html div for future usage
            block.data({
                'x': x,
                'y': y
            });
        },
        canMove: (target) => {
            const x = target.data('x');
            const y = target.data('y');
            return (game.findNearestEmptyPosition(x, y) != null);
        },
        findNearestEmptyPosition: (x, y) => {
            if ((y > 0) && (game.matrix[y - 1][x] == 0)) {
                return {        //0X0
                    x: x,       //010
                    y: y - 1    //000
                };
            } else if ((y < game.matrix.length - 1) && (game.matrix[y + 1][x] == 0)) {
                return {        //000
                    x: x,       //010
                    y: y + 1    //0X0
                };
            } else if ((x > 0) && (game.matrix[y][x - 1] == 0)) {
                return {        //000
                    x: x - 1,   //X10
                    y: y        //000
                };
            } else if ((x < game.matrix[y].length - 1) && (game.matrix[y][x + 1] == 0)) {
                return {        //000
                    x: x + 1,   //01X
                    y: y        //000
                }
            } else {
                return null;
            }
        },
        shuffle: () => {
            //Quantity of moves that should be executed
            const randomMoves = Math.floor((Math.random() * (200 - 20)) + 20);

            for (let i = 0; i < randomMoves; i++) {
                //Take a random position in the matrix
                const randomPosition = {
                    x: Math.floor(Math.random() * _matrixSize),
                    y: Math.floor(Math.random() * _matrixSize)
                };

                //If cannot move this random position, ignore
                const newPosition = game.findNearestEmptyPosition(randomPosition.x, randomPosition.y);
                if (!newPosition) continue;

                //If can move, clear the matrix
                game.matrix[randomPosition.y][randomPosition.x] = 0;

                //Find the div on the screen
                const div = $('#puzzlearea div').filter(function(i) {
                                return $(this).data('x') == randomPosition.x && $(this).data('y') == randomPosition.y;
                            });

                //Redraw it with the new position
                game.drawBlock(div, newPosition.x, newPosition.y);
            }
        }
    };

    //Start the game
    game.preload();
    $('#shufflebutton').click(game.shuffle);
});