const datasetInfo = require('../../data/datasets.info.json')

const getIndex = (req, res) => {
    console.log("Rendering app");
    return res.render('app', {"corpora":datasetInfo})
};

module.exports = {
    getIndex
};