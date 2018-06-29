module.exports = (req, res, next) => {
    console.log("vô middle");
    if (req.session.isLogged === true) {
        next();
    } else {
        res.redirect(`/customer/login`);
    }
}