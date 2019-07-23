//ES6 
class Car {
    constructor(color, weight) {
        this.color = color;
        this.weight = weight;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getWeight() {
        return this.weight;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    beeping() {
        console.log("Biiiiiiiibiiiiiib");
    };
}


class SmallCar extends Car {
    constructor(color, weight, numberOfDoors, isAutomaticTransmission) {
        super(color, weight);
        this.numberOfDoors = numberOfDoors;
        this.isAutomaticTransmission = isAutomaticTransmission;
    }

    getNumberOfDoors() {
        return this.numberOfDoors;
    }

    setNumberOfDoors(numberOfDoors) {
        this.numberOfDoors = numberOfDoors;
    }

    getIsAutomaticTransmission() {
        return this.isAutomaticTransmission;
    }

    setIsAutomaticTransmission(isAutomaticTransmission) {
        this.isAutomaticTransmission = isAutomaticTransmission;
    }

    beeping() {
        console.log("bi - bi - boo - booo");
    };
}

class Sedan extends SmallCar {
    constructor(color, weight, numberOfDoors, isAutomaticTransmission, made, year, model) {
        super(color, weight, numberOfDoors, isAutomaticTransmission);
        this.made = made;
        this.year = year;
        this.model = model;
    }

    getMade() {
        return this.made;
    }

    setMade(made) {
        return this.made;
    }

    getYear() {
        return this.year;
    }

    setYear(year) {
        return this.year;
    }

    getModel() {
        return this.model;
    }

    setModel(model) {
        return this.model;
    }
}

class BigCar extends Car {
    constructor(color, weight, isTruck) {
        super(color, weight);
        this.isTruck = isTruck;
    }

    getIsTruck() {
        return this.isTruck;
    }

    setIsTruck(isTruck) {
        this.isTruck = isTruck;
    }

    beeping() {
        console.log("TOOOOODOOOOTTTOOOOO");
    };
}

class SuperBigCar extends BigCar {
    constructor(color, weight, isTruck, maxWeight) {
        super(color, weight, isTruck);
        this.maxWeight = maxWeight;
    }

    getMaxWeight() {
        return this.maxWeight;
    }

    setMaxWeight(maxWeight) {
        this.maxWeight = maxWeight;
    }
}


module.exports = Car;
module.exports = SuperBigCar;
module.exports = BigCar;
module.exports = Sedan;
module.exports = SmallCar;
