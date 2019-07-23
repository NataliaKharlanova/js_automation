// jsonValidator.js
const fs = require('fs');
const rulesURL = "./rules.json";
const dataURL = "./data.json";


class JsonValidator {
    constructor() {
        this.data = this.readData();
        this.rules = this.rulesReading();
        this.newJSON = {};
    }

    setRules(rules) {
        this.rules = rules;
    }

    getRules() {
        return this.rules;
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    rulesReading() {
        return JSON.parse(/*await*/ this.getJsonData(rulesURL));
        //this.setRules(JSON.parse(await this.getJsonData(rulesURL)));
    };

    /*async*/ readData() {
        //let val = await this.getJsonData(dataURL);
        return JSON.parse(this.getJsonData(dataURL));

        //var1
        //  await this.getJsonData(dataURL)
        //      .then(val => JSON.parse(val)
        //          .then(r => this.setData(r)));
    };

    validateDataAndWriteNewFile() {
        this.validateData();
        this.writeJSONFile();
    };

    validateData() {
        

        let keysRules = Object.keys(this.rules);
        let valueRules = Object.values(this.rules);

        let keysData = Object.keys(this.data);
        let valueData = Object.values(this.data);

        this.validateJSONInput(keysRules, valueRules, keysData, valueData);
    
    };


    validateJSONInput(keysRules, valueRules, keysData, valueData){
        for (let i in keysRules) {
            let tmp = "";

            if (keysRules[i] !== keysData[i]) {
                tmp = "Key is wrong: Actual: " + keysData[i] + " ; Expected:" + keysRules[i] + "; ";
            }

            if ((typeof valueData[i]) === "object") {
                let subkeysRules = Object.keys(valueRules[i])
                let subvalueRules = Object.values(valueRules[i]);
                let subkeysData = Object.keys(valueData[i]);
                let subvalueData = Object.values(valueData[i]);
                this.validateJSONInput (subkeysRules, subvalueRules, subkeysData, subvalueData);
            } else if ((typeof valueData[i]) !== valueRules[i]) {
                tmp = tmp + "Wrong value type for " + keysRules[i] + ": Actual: " + typeof (valueData[i]) + " ; Expected:" + valueRules[i] + "; ";
            }
            if (tmp !== "") {
                this.newJSON[keysRules[i]] = tmp;
                console.log(tmp);
            }
        }
    }



    /* async*/ getJsonData(jsonTitle) {
        let v = /*await*/ fs./*promises.*/readFileSync(jsonTitle, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            //console.log(jsonString);
            return jsonString;
        })

        return v;
    }


    writeJSONFile() {
        const fs = require('fs');

        const jsonString = JSON.stringify(this.newJSON);
        fs.writeFileSync('./newData.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
            }
        })

    }

}

module.exports = JsonValidator;