// jsonValidator.js
const fs = require('fs');
const fsPromises = require('fs').promises;
const rulesURL = "./rules.json";
const dataURL = "./data.json";


class JsonValidator {
    constructor() {
        this.newJSON = {};
    }

    // setRules(rules) {
    //     this.rules = rules;
    // }

    // getRules() {
    //     return this.rules;
    // }

    // setData(data) {
    //     this.data = data;
    // }

    // getData() {
    //     return this.data;
    //}

    async readAndValidateData(){
        const _data = await this.getUpdataFromJSON(dataURL);
        const _rules = await this.getUpdataFromJSON(rulesURL);
        this.validateData(_data, _rules);
        this.writeJSONFile();
    }

    async getUpdataFromJSON(dataURL){
        let val = await this.getJsonData(dataURL);
        let result = await JSON.parse(val);
        return result;
    }

    validateData(_data, _rules) {
        let keysRules = Object.keys(_rules);
        let valueRules = Object.values(_rules);

        let keysData = Object.keys(_data);
        let valueData = Object.values(_data);

        this.validateJSONInput(keysRules, valueRules, keysData, valueData);
    };

    validateJSONInput(keysRules, valueRules, keysData, valueData){
        for (let i in keysRules) {
            let tmp = "";

            if (keysRules[i] !== keysData[i]) {
                tmp = "Key is wrong: Actual: " + keysData[i] + " ; Expected:" + keysRules[i] + "; ";
            }
            let typeOfValueDataActual = typeof valueData[i];
            let typeOfValueDataExpected = valueRules[i];

            if (typeOfValueDataActual === "object") {
                let subkeysRules = Object.keys(valueRules[i])
                let subvalueRules = Object.values(valueRules[i]);
                let subkeysData = Object.keys(valueData[i]);
                let subvalueData = Object.values(valueData[i]);
                this.validateJSONInput (subkeysRules, subvalueRules, subkeysData, subvalueData);
            } else if (typeOfValueDataActual !== typeOfValueDataExpected) {
                tmp = tmp + "Wrong value type for " + keysRules[i] + ": Actual: " + typeOfValueDataActual + " ; Expected:" + typeOfValueDataExpected + "; ";
            }

            if (tmp !== "") {
                this.newJSON[keysRules[i]] = tmp;
                console.log(tmp);
            }
        }
    }

    async getJsonData(jsonTitle) {
        
        let v = await fsPromises.readFile(jsonTitle, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            console.log(jsonString);
            return jsonString;
        })
        console.log(v);
        return v;
    }

    writeJSONFile() {
        const jsonString = JSON.stringify(this.newJSON);
        fs.writeFile('./newData.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
            }
        })
    }
}

module.exports = JsonValidator;