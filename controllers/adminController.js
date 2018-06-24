var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.locals.layoutVM={
        isSearch: false,
        showNavBar: false,
        showSideBar: false,
        isAdmin: req.session.isAdmin
    };
    res.render('admin/admin_dashboard');
});

module.exports = router;