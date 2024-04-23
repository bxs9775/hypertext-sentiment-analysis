const fs = require('node:fs');
const { parse } = require('csv-parse');

class FileIOHelper{
    constructor(){
        this.dataDir = './data'
    }

    getCorporaJsonFile(corporaName,fileName){
        let path = `${this.dataDir}/${corporaName}/${corporaName}_${fileName}.json`;
        let raw = fs.readFileSync(path,'utf-8','r');
        let data = JSON.parse(raw);
        return data;
    }

}

module.exports = new FileIOHelper();