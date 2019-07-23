function Car(color, weight) {
    this.color = color;
    this.weight = weight;
};

Car.prototype.beeping = function () {
    console.log("Biiiiiiiibiiiiiib");
};


function SmallCar(color, weight, numberOfDoors, isAutomaticTransmission) {
    Car.call(this, color, weight);
    this.numberOfDoors = numberOfDoors;
    this.isAutomaticTransmission = isAutomaticTransmission;
}

SmallCar.prototype = Object.create(Car.prototype);
SmallCar.prototype.constructor = SmallCar;

SmallCar.prototype.beeping = function() {
    console.log("bi - bi - boo - booo");
};


function Sedan(color, weight, numberOfDoors, isAutomaticTransmission, made, year, model) {
    SmallCar.call(this, color, weight, numberOfDoors, isAutomaticTransmission);
    this.made = made;
    this.year = year;
    this.model = model;
}

Sedan.prototype = Object.create(SmallCar.prototype);
Sedan.prototype.constructor = Sedan;

function BigCar(color, weight, isTruck) {
    Car.call(this, color, weight);
    this.isTruck = isTruck;
}

BigCar.prototype = Object.create(Car.prototype);
BigCar.prototype.constructor = BigCar;

BigCar.prototype.beeping = function() {
    console.log("TOOOOODOOOOTTTOOOOO");
};

function SuperBigCar(color, weight, isTruck, maxWeight) {
    Car.call(this, color, weight, isTruck);
    this.maxWeight = maxWeight;
}

SuperBigCar.prototype = Object.create(BigCar.prototype);
SuperBigCar.prototype.constructor = SuperBigCar;


module.exports = Car;
module.exports = SuperBigCar;
module.exports = BigCar;
module.exports = Sedan;
module.exports = SmallCar;