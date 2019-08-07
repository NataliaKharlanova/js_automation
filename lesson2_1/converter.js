const fs = require('fs');
const fsPromises = require('fs').promises;
const XLSX = require('xlsx');


class Converter {
    constructor() {
        this.newJSON = {};
    }

    getFrom() {
        return this.from;
    }


    setFrom(from) {
        this.from = from;
    }

    getTo() {
        return this.to;
    }


    setTo(to) {
        this.to = to;
    }

    async convertFromTo(from, to) {
        this.setFrom(from);
        this.setTo(to);
        let array = await this.getArrayOfJSONFiles();
        this.readJsonAndWriteToXLSX(array)
    }

    
    async getArrayOfJSONFiles() {
        try {
          return await fsPromises.readdir(this.from);
        } catch (err) {
          console.error('Error occured while reading directory!', err);
        }
      }

    readJsonAndWriteToXLSX(k) {
        const wb = this.readBook();
        let ws ;

        for (let i of k) {
            if (i.includes(".json")) {
                let data = this.readEveryJsonAndWriteToXLSX(i);
                
                if(ws == null){
                    ws = XLSX.utils.aoa_to_sheet(data)
                } else {
                    XLSX.utils.sheet_add_aoa(ws, data, {origin: -1});
                }
                
            }
        }
    
        XLSX.utils.book_append_sheet(wb, ws, "Info");
        XLSX.writeFile(wb, this.getTo() + "new.xlsx");
    }


    readEveryJsonAndWriteToXLSX(file) {
        let data = this.returnJSONdata(this.getFrom() + file);
        return this.readJSONDataAndCollectInfo(data);
    }

    returnJSONdata(jsonTitle) {
        return JSON.parse(this.readJsonFile(jsonTitle));
    }

    readJsonFile(jsonTitle) {
        let v = fs.readFileSync(jsonTitle, 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            return jsonString;
        })

        return v;
    }

    readBook() {
        let wb;
        try {
            wb = fs.readFileSync(this.getTo() + "new.xlsx");
        }
        catch (error) {
            wb = XLSX.utils.book_new();
        }
        return wb;
    }

    readJSONDataAndCollectInfo(value) {
        let keys = Object.keys(value);
        let values = Object.values(value);

        let s = [];
        s = this.collectData(keys, values, s);

        return s;
    };

    
    collectData(keys, values, s){
        let _s = s;
        for (let i in keys) {
            if (values[i] instanceof Object) {
                _s.push([keys[i]]);
                let subkeys = Object.keys(values[i])
                let subvalues = Object.values(values[i]);   
                _s = this.collectData(subkeys, subvalues, _s);
            } else {
                _s.push([keys[i], values[i]]); 
            }
        }
        return _s;
    }

}



module.exports = Converter;