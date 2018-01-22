/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";

    const txt = document.getElementById("text");

    window.onload = () => {
        const btnBiggerDecorations = document.getElementById("btnBiggerDecorations");
        const btnPigLatin = document.getElementById("btnPigLatin");
        const btnMalkovitch = document.getElementById("btnMalkovitch");
        const ckbBling = document.getElementById("ckbBling");
        let biggerDecorationId;

        btnBiggerDecorations.onclick = () => {
            if (biggerDecorationId) {
                clearInterval(biggerDecorationId);
                biggerDecorationId = null;
            } else {
                biggerDecorationId = setInterval(setSize, 500);
            }

            function setSize() {
                var fontSize = parseInt(txt.style.fontSize);
                if (!fontSize) {
                    fontSize = 12;
                }
                txt.style.fontSize = fontSize + 2 + "pt";
            }
        };

        btnPigLatin.onclick = () => {
            const text = txt.value;
            if (!text) { //If there's no text, nothing to do...
                return;
            }

            var words = text.split(' ');

            for (var i = 0; i < words.length; i++) {
                words[i] = postFix(words[i]) + "ay";
            }

            txt.value = words.join(' ');

            function postFix(text) {
                var startText = "";

                while (startsWithConsonant(text)) {
                    startText += text[0];
                    text = text.substring(1);
                }

                return text + startText;
            }

            function startsWithConsonant(text) {
                if (!text) {
                    return text;
                }

                var firstLetterAscii = text[0];
                var vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

                return vowels.indexOf(firstLetterAscii) < 0;
            }
        };

        btnMalkovitch.onclick = () => {
            var text = txt.value;
            if (!text) { //If there's no text, nothing to do...
                return;
            }
            var words = text.split(' ');

            for (var i = 0; i < words.length; i++) {
                words[i] = replaceMalkovitch(words[i]);
            }

            txt.value = words.join(' ');

            function replaceMalkovitch(word) {
    
                if (word.length >= 5) {
                    return "Malkovich";
                }
    
                return word;
            }
        };

        ckbBling.onchange = () => {
            //cannot use "this" because arrow functions don`t create scopes, so this is Window and not the checkbox
            const checked = ckbBling.checked;

            txt.style.fontWeight = checked ? "bold" : "normal";
            txt.style.color = checked ? "#0f0" : "initial";
            txt.style.textDecoration = checked ? "underline" : "none";

            document.body.style.backgroundRepeat = "repeat";
            document.body.style.background = checked ? "url('http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg')" : "";
        };
    };
})();