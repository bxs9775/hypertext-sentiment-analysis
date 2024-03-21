const getIndex = (req, res) => {
    console.log("Rendering app");
    return res.render('app', {})
};

module.exports = {
    getIndex
};