const datasetInfo = require('../../data/datasets.info.json')

const getIndex = (req, res) => {
    return res.render('app', {"corpora":datasetInfo})
};

module.exports = {
    getIndex
};