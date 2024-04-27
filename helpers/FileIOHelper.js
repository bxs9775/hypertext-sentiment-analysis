const fs = require('node:fs');
const { parse } = require('csv-parse/sync');

class FileIOHelper{
    constructor(dataDir){
        this.dataDir = dataDir;
    }

    getCorporaJsonFile(corporaName,fileName){
        let path_str = `${this.dataDir}\\${corporaName}\\${corporaName}_${fileName}.json`;
        let raw = fs.readFileSync(path_str,'utf-8','r');
        let data = JSON.parse(raw);
        return data;
    }

    getCsvFile(fileName){
        let path_str = `${this.dataDir}/${fileName}.csv`;
        let raw = fs.readFileSync(path_str,'utf-8','r');
        
        let data = parse(raw, {
            bom: true,
            columns: true
        });

        return data;
    }

    saveEmotionalArcData(corporaName,emotionalArcs){
        // create json file
        let path_str = `${this.dataDir}\\${corporaName}\\${corporaName}_emotionalArcs.json`;
        fs.writeFileSync(path_str,JSON.stringify(emotionalArcs));
    }

}

module.exports = FileIOHelper;