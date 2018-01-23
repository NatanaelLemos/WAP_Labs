/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";
    const accountInfoList = [];

    window.onload = () => {
        document.getElementById("submit").onclick = () => {
            const newAccount = Account();
            accountInfoList.push(newAccount);
            displayList(accountInfoList);
        };
    };

    function displayList(list){
        const textArea = document.getElementById("textArea");
        textArea.value = "";

        for(const line of list){
            textArea.value += `Account Name: ${line.name}   Balance: ${line.deposit}\n`;
        }
    }
})();

function Account(){
    return {
        name: document.getElementById("accountName").value,
        deposit: document.getElementById("deposit").value
    };
}