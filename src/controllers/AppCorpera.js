const FileIOHelper = require('../helpers/FileIOHelper')

class AppCorpera{
    constructor(corpora){
        this.corpora = corpora;
    }

    getIndex(req, res){
        console.log(`Rendering summary for "${this.corpora.fullName}"`);
        let detailsData = FileIOHelper.getJsonFile(this.corpora.shortName,'details');
        
        return res.render('corpora/summary', {
            "corpora": this.corpora,
            graph: JSON.stringify(detailsData.graph),
            paths: detailsData.paths
        });
    }
} 

module.exports = AppCorpera;