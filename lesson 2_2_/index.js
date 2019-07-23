// app/index.js
//const car = require("./car");
const car = require("./car_pr");
const readline = require("readline");



let bigCar = new BigCar();
bigCar.setIsTruck(true)
    .setColor("Red")
    .setWeight("12000");


let car = new Car("Black", '1900');
let maz = new SuperBigCar("Black", 100000, true, 300);