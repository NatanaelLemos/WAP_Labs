"use strict";
/* jshint esversion: 6 */
/* jshint browser: true */

class Animation {
    constructor(turbo = false, style = 'blank', size = 12){
        this.turbo = turbo;
        this.style = style;
        this.size = size;
    }

    set style (value){
        document.getElementById("txtAnimation").value = ANIMATIONS[value];
    }

    set turbo (value) {
        this._turbo = value;

        if(this._interval){
            clearInterval(this._interval);
            this._interval = this._animate();
        }
    }

    set size (value) {
        document.getElementById("txtAnimation").style.fontSize = `${value}pt`;
    }

    start() {
        this._previousText = document.getElementById("txtAnimation").value;
        this._frames = this._splitFrames(this._previousText);
        this._interval = this._animate();
    }

    _splitFrames(animationFrames) {
        const textLines = animationFrames.split("=====\n");
        return textLines;
    }

    _animate() {
        const speed = this._turbo ? 50 : 250;
        let frameIdx = 0;
        return setInterval(() => {
            document.getElementById("txtAnimation").value = this._frames[frameIdx];
            frameIdx++;
            if(frameIdx >= this._frames.length){
                frameIdx = 0;
            }
        }, speed);
    }

    stop() {
        clearInterval(this._interval);
        this._interval = null;
        document.getElementById("txtAnimation").value = this._previousText;
    }
}

(() => {
    const animation = new Animation();

    const controls = {
        ddlAnimations: document.getElementById("ddlAnimations"),
        ddlSizes: document.getElementById("ddlSizes"),
        btnStart: document.getElementById("btnStart"),
        btnStop: document.getElementById("btnStop"),
        ckbTurbo: document.getElementById("ckbTurbo")
    };

    window.onload = () => {
        fillAnimationsDropDown();
        enableControls(false);
        attachEvents();
    };

    function fillAnimationsDropDown(){
        const added = [];

        for (let [idx, animationStyle] of Object.keys(ANIMATIONS).entries()) {
            animationStyle = animationStyle.toLowerCase();

            if(added.indexOf(animationStyle) >= 0){ continue; }
            added.push(animationStyle);

            controls.ddlAnimations.innerHTML += `<option value="${animationStyle}">${animationStyle}</option>`;
            if(idx == 0){ animation.style = animationStyle; }
        }
    }

    function enableControls(isPlaying){
        controls.btnStart.disabled = isPlaying;
        controls.btnStop.disabled = !isPlaying;
        controls.ddlAnimations.disabled = isPlaying;
    }

    function attachEvents(){
        controls.btnStart.onclick = () => {
            enableControls(true);
            animation.start();
        };

        controls.btnStop.onclick = () => {
            enableControls(false);
            animation.stop();
        };

        controls.ckbTurbo.onchange = () => animation.turbo = controls.ckbTurbo.checked;
        controls.ddlAnimations.onchange = () => animation.style = controls.ddlAnimations.value;
        controls.ddlSizes.onchange = () => animation.size = controls.ddlSizes.value;
    }
})();