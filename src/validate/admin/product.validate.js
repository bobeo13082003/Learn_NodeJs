module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Title Not Empty");
        res.redirect('back');
        return;
    }
    next();
}