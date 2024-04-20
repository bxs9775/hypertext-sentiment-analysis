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
        let textData = FileIOHelper.getJsonFile(this.corpora.shortName,'cleaned');
        let path = detailsData.paths[pathId];
        let fullText = path.reduce((txt,page) => {
            txt[page] = textData[page]
            return txt;
        },new Object())
        return res.render('corpora/path', {
            "corpora": this.corpora,
            pathId: pathId,
            path: path,
            fullText: JSON.stringify(fullText)
        });
    }
} 

module.exports = AppCorpera;