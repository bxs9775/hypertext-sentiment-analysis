const express = require('express');
const controllers = require('../controllers');

class AppCorperaRouter{
    constructor(corpora){
        this.corpora = corpora;
        this.controller = new controllers.AppCorpora(corpora);

        this.router = express.Router()

        this.router.get('/',this.controller.getIndex.bind(this.controller));
        this.router.get('/path/:id',this.controller.getPathDetails.bind(this.controller))
    }
}

module.exports = AppCorperaRouter;