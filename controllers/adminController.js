var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.locals.layoutVM={
        isSearch: false,
        showNavBar: false,
        showSideBar: false,
    };
    res.render('admin/admin_dashboard');
});

module.exports = router;