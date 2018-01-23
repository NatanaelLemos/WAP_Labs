/* jshint esversion: 6 */
/* jshint browser: true */

(() => {
    "use strict";
    const accountInfoList = [];

    window.onload = () => {
        document.getElementById("submit").onclick = () => {
            const newAccount = AccountFactory().createAccount();
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

function AccountFactory(){
    let name, deposit;
    return {
        createAccount: () => {
            this.name = document.getElementById("accountName").value;
            this.deposit = document.getElementById("deposit").value;

            return {
                name: this.name,
                deposit: this.deposit
            };
        }
    }
}