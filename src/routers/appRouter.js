const express = require('express');

const controllers = require('../controllers');
const AppCorporaRouter = require('./AppCorporaRouter');
const datasetInfo = require('../../data/datasets.info.json')

const router = express.Router();

router.get('/', controllers.App.getIndex);
for(let corpora of datasetInfo){
    let corporaRouter = new AppCorporaRouter(corpora)
    router.use(`/corpora/${corpora.shortName}`,corporaRouter.router);
}


module.exports = router;
