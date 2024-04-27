// Batch job for generating smoothed emotional arc data
// Usage ./batch-jobs/create-arc-plots.js --name datasetName [--mu 1.5] [--stop 4 6]

// imports
const yargs = require("yargs");
const path = require('path');
const FileIOHelper = require("../helpers/FileIOHelper");

function createSmoothedData(rawData,sentimentDict,mu,stopRange){
    console.log(`mu = ${mu}, stop = ${stopRange}`);
    let windowLength = Math.round(10**mu);
    let nMax = rawData.length - windowLength - 1;

    let dataset = [];
    for(let n = 0; n < nMax; n++){
        let dataWindow = rawData.slice(n,n+windowLength);

        let hScores = []
        for(let word of dataWindow){
            let index = sentimentDict.findIndex(record => record['Word'] === word.toLowerCase())
            if(index > -1){
                let score = sentimentDict[index]['Happiness Score'];
                if(score <= stopRange[0] || score >= stopRange[1]){
                    hScores.push(score);
                }
            }
        }
        if(hScores.length > 0){
            let hSum = hScores.reduce( (total,score) => total+parseFloat(score),0);
            let hAvg = (hScores.length > 0)?hSum/hScores.length:1;
            dataset.push([n,hAvg])
        }
        
    }
    //console.log('Dataset: ',JSON.stringify(dataset))

    return dataset   
}

function main(){
    // Check args
    const { argv } = yargs(process.argv).array("stop");
    if(!argv.name){
        console.error("name not provided");
        process.exit(1);
    }
    let mu = (argv.mu)?argv.mu:1.5;
    let stopRange = (argv.stop)?argv.stop:[4,6];
    
    let ioHelper = new FileIOHelper(path.resolve(__dirname,'..\\data'));

    // load json files
    let labMT = ioHelper.getCsvFile('hedonometer')

    let detailsData = ioHelper.getCorporaJsonFile(argv.name,'details');
    let textData =ioHelper.getCorporaJsonFile(argv.name,'cleaned');

    let emotionalArcs = {};

    for(let [i, path] of Object.entries(detailsData.paths)){
        console.log(`Creating emotional arc data for Path ${i}`);
        console.log(path);
        let fullData = path.map(page => textData[page]).flat().join(' ').split(' ');
        emotionalArcs[i] = createSmoothedData(fullData,labMT,mu,stopRange);
        console.log('\n\n');
    }
    console.log('Emotional arcs: ',emotionalArcs)

    ioHelper.saveEmotionalArcData(argv.name,emotionalArcs);
}

main();