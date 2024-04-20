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

    getPathDetails(req, res){
        let pathId = req.params.id;
        let detailsData = FileIOHelper.getJsonFile(this.corpora.shortName,'details');
        let path = detailsData.paths[pathId];
        return res.render('corpora/path', {
            "corpora": this.corpora,
            pathId: pathId,
            path: path
        });
    }
} 

module.exports = AppCorpera;