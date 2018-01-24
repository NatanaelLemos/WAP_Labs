/* jshint esversion: 6 */
/* jshint browser: true */
var outsideArea;

$(() => {
    "use strict";

    outsideArea = $('body *').not('#maze, #maze *');
    const boundary = $('.boundary');
    const start = $('#start');
    const end = $('#end');
    const status = $('#status');

    boundary.mouseover(youLose);
    outsideArea.mouseover(function(){
        
        if(boundary.hasClass('youlose')){
            return;
        }
        console.log(this);
        youLose();
    });

    start.click(() => boundary.removeClass('youlose'));

    end.mouseover(() => {
        if(boundary.hasClass('youlose')){
            return;
        }
        status.text('You win');
    });


    function youLose() {
        boundary.addClass('youlose');
    }
});