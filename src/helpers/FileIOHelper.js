const fs = require("node:fs");

class FileIOHelper{
    constructor(){
        this.dataDir = './data'
    }

    getJsonFile(corporaName,fileName){
        let path = `${this.dataDir}/${corporaName}/${corporaName}_${fileName}.json`;
        let raw = fs.readFileSync(path,'utf-8','r')
        let data = JSON.parse(raw);
        return data;
    }
}

module.exports = new FileIOHelper();