"use strict";

var txt = document.getElementById("text");
var bling = document.getElementById("bling");
var biggerDecorationId;

function onBiggerDecorations() {
    if(biggerDecorationId){
        clearInterval(biggerDecorationId);
        biggerDecorationId = null;
    }else{
        biggerDecorationId = setInterval(increaseFontSize, 500);
    }
}

function increaseFontSize(){
    var fontSize = parseInt(txt.style.fontSize);
    if(!fontSize){
        fontSize = 12;
    }

    txt.style.fontSize = fontSize + 2 + "pt";
}

function onBling() {
    var checked = bling.checked;

    txt.style.fontWeight = checked ? "bold" : "normal";
    txt.style.color = checked ? "#0f0" : "initial";
    txt.style.textDecoration = checked ? "underline" : "none";

    document.body.style.backgroundRepeat = "repeat";
    document.body.style.background = checked ? "url('http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg')" : "";
}

function onPigLatin(){
    var text = txt.value;
    if(!text){ //If there's no text, nothing to do...
        return;
    }
    var words = text.split(' ');

    for(var i = 0; i < words.length; i++){
        words[i] = postFix(words[i]) + "ay";
    }

    txt.value = words.join(' ');
}

function postFix(text){
    var startText = "";

    while(startsWithConsonant(text)) {
        startText += text[0];
        text = text.substring(1);
    }

    return text + startText;
}

function startsWithConsonant(text){
    if(!text){
        return text;
    }

    var firstLetterAscii = text[0];
    var vowels = ['a', 'e', 'i', 'o', 'u'];

    return vowels.indexOf(firstLetterAscii) < 0;
}

function onMalkovitch() {
    var text = txt.value;
    if(!text){ //If there's no text, nothing to do...
        return;
    }
    var words = text.split(' ');

    for(var i = 0; i < words.length; i++){
        words[i] = replaceMalkovitch(words[i]);
    }

    txt.value = words.join(' ');
}

function replaceMalkovitch(word){

    if(word.length >= 5) {
        return "Malkovich";
    }

    return word;
}