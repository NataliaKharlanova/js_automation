// palindrom.js

function checkPalindrom(value){
    if (value.length > 0) {
        for (let i = 0; i < (value.length) / 2; i++) {
            if (value[i] != value[value.length - i - 1]) {
                return false;
            }
        }
    }
    return true;
}

module.exports = checkPalindrom;