class AppCorpera{
    constructor(corpora){
        this.corpora = corpora;
    }

    getIndex(req, res){]
        console.log(`Rendering summary for "${this.corpora.fullName}"`);
        return res.render('corpora/summary', {"corpora": this.corpora})
    }
} 

module.exports = AppCorpera;