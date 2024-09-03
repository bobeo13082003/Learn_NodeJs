// [GET] /

module.exports.home = (req, res) => {
    res.render('client/pages/home/index', { title: 'Home Page' })
}