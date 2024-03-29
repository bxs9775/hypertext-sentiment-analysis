const express = require('express');
const controllers = require('../controllers');

class AppCorperaRouter{
    constructor(corpora){
        console.log(`Router - /corpora/${corpora.shortName}`)
        this.corpora = corpora;
        this.controller = new controllers.AppCorpora(corpora);

        this.router = express.Router()

        this.router.get('/',this.controller.getIndex.bind(this.controller));
    }
}

module.exports = AppCorperaRouter;