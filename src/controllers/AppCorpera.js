const FileIOHelper = require('../helpers/FileIOHelper')

class AppCorpera{
    constructor(corpora){
        this.corpora = corpora;
    }

    createSmoothedData(rawData,sentimentDict,mu,stopRange){
        console.log('Smoothing data')
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
        console.log(dataset)
    
        return dataset   
    }

    getIndex(req, res){
        console.log(`Rendering summary for "${this.corpora.fullName}"`);
        let detailsData = FileIOHelper.getCorporaJsonFile(this.corpora.shortName,'details');
        
        return res.render('corpora/summary', {
            "corpora": this.corpora,
            graph: JSON.stringify(detailsData.graph),
            paths: detailsData.paths
        });
    }

    getPathDetails(req, res){
        let pathId = req.params.id;

        let detailsData = FileIOHelper.getCorporaJsonFile(this.corpora.shortName,'details');
        let textData = FileIOHelper.getCorporaJsonFile(this.corpora.shortName,'cleaned');

        let path = detailsData.paths[pathId];
        let fullText = path.reduce((txt,page) => {
            txt[page] = textData[page]
            return txt;
        },new Object());
        console.log('Full text',fullText);
        let fullData = path.map(page => textData[page]).flat().join(' ').split(' ');
        console.log("Data",fullData);

        let labMT = FileIOHelper.getCsvFile('hedonometer')
        console.log('logMT:',labMT);
        let mu = 1.5;
        let stopRange = [4.0,6.0];
        
        let dataset = this.createSmoothedData(fullData,labMT,mu,stopRange)
        console.log(dataset)
        
        return res.render('corpora/path', {
            "corpora": this.corpora,
            pathId: pathId,
            path: path,
            textData: JSON.stringify(dataset)
        });
    }
} 

module.exports = AppCorpera;