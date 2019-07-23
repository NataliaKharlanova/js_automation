// app/index.js
const checkPalindrom = require("./palindrom");
const readline = require("readline");


let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question("Input palindrom: ", function(answer) {
  let returnvalue = checkPalindrom(answer);
  console.log("Is word palindrom: ", returnvalue);
  
  rl.close();
});


