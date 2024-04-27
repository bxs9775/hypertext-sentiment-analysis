const FileIOHelper = require('../../helpers/FileIOHelper')

class AppCorpera{
    constructor(corpora){
        this.corpora = corpora;
        this.ioHelper = new FileIOHelper('./data');
    }

    

    getIndex(req, res){
        console.log(`Rendering summary for "${this.corpora.fullName}"`);
        let detailsData = this.ioHelper.getCorporaJsonFile(this.corpora.shortName,'details');
        
        return res.render('corpora/summary', {
            "corpora": this.corpora,
            graph: JSON.stringify(detailsData.graph),
            paths: detailsData.paths
        });
    }

    getPathDetails(req, res){
        let pathId = req.params.id;

        let detailsData = this.ioHelper.getCorporaJsonFile(this.corpora.shortName,'details');
        let emotionalArcData = this.ioHelper.getCorporaJsonFile(this.corpora.shortName,'emotionalArcs')[pathId];

        let path = detailsData.paths[pathId];
        
        return res.render('corpora/path', {
            "corpora": this.corpora,
            pathId: pathId,
            path: path,
            emotionalArc: JSON.stringify(emotionalArcData)
        });
    }
} 

module.exports = AppCorpera;