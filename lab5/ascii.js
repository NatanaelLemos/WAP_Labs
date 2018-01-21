"use strict";
/* jshint esversion: 6 */
/* jshint browser: true */

class AnimationFactory {
    static getAnimation(style) {
        const frameSizes = {
            blank: 5,
            custom: 5,
            exercise: 4,
            juggler: 5,
            bike: 5,
            dive: 21
        };

        return {
            animation: ANIMATIONS[style],
            frameSize: frameSizes[style],
            style: style
        };
    }

    static splitFrames(animationFrames, frameSize) {
        const textLines = animationFrames.split("\n");
        const result = [];

        for(const [idx, line] of textLines.entries()){
            if(idx % frameSize === 0){
                result.push(line);
            }else{
                result[result.length -1] += `\n${line}`;
            }
        }

        return result;
    }
}

class Animation {
    constructor(turbo = false, style = 'blank', size = 12){
        this.turbo = turbo;
        this.style = style;
        this.size = size;
    }

    set style (value){
        this._animation = AnimationFactory.getAnimation(value);
        document.getElementById("txtAnimation").value = this._animation.animation;
    }

    set turbo (value) {
        this._turbo = value;

        if(this._interval){
            this.stop();
            this._interval = this._animate();
        }
    }

    set size (value) {
        document.getElementById("txtAnimation").style.fontSize = `${value}pt`;
    }

    start() {
        this._frames = AnimationFactory.splitFrames(document.getElementById("txtAnimation").value, this._animation.frameSize);
        this._interval = this._animate();
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
    }
}

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