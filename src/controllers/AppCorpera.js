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

    getPathsSummary(req, res){
        let detailsData = this.ioHelper.getCorporaJsonFile(this.corpora.shortName,'details');
        let emotionalArcData = this.ioHelper.getCorporaJsonFile(this.corpora.shortName,'emotionalArcs');

        let max_word_count = detailsData.path_words_stats.max;
        let mag_word_count = 10**Math.log10(max_word_count);
        let max_x = Math.ceil(max_word_count/mag_word_count) * mag_word_count
        
        return res.render('corpora/all-paths', {
            "corpora": this.corpora,
            paths: detailsData.paths,
            emotionalArcs: JSON.stringify(emotionalArcData),
            max_x: max_x
        });
    }

    getPathDetails(req, res){
        let pathId = req.params.id;

        let detailsData = this.ioHelper.getCorporaJsonFile(this.corpora.shortName,'details');
        let emotionalArcData = this.ioHelper.getCorporaJsonFile(this.corpora.shortName,'emotionalArcs')[pathId];

        let path = detailsData.paths[pathId];
        let max_word_count = detailsData.path_words_stats.max;
        let mag_word_count = 10**Math.log10(max_word_count);
        let max_x = Math.ceil(max_word_count/mag_word_count) * mag_word_count;
        
        return res.render('corpora/path', {
            "corpora": this.corpora,
            pathId: pathId,
            path: path,
            emotionalArc: JSON.stringify(emotionalArcData),
            max_x: max_x
        });
    }
} 

module.exports = AppCorpera;