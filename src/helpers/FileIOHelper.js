const fs = require('node:fs');
const { parse } = require('csv-parse/sync');

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

    getCsvFile(fileName){
        let path = `${this.dataDir}/${fileName}.csv`;
        let raw = fs.readFileSync(path,'utf-8','r');
        
        let data = parse(raw, {
            bom: true,
            columns: true
        });

        return data;
    }

}

module.exports = new FileIOHelper();