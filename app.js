var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var wnumb = require('wnumb');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var handleLayoutMDW = require('./middle-wares/handleLayout'),
    handle404MDW = require('./middle-wares/handle404');
restrict = require('./middle-wares/restrict');

var homeController = require('./controllers/homeController'),
    categoryController = require('./controllers/categoryController'),
    productController = require('./controllers/productController'),
    customerController = require('./controllers/customerController'),
    searchController = require('./controllers/searchController'),
    producerController = require('./controllers/producerController');
//admin
adminController = require('./controllers/adminController');
cartController = require('./controllers/cartController');
//receipt
receiptController = require('./controllers/receiptController');
//register
register=require('./server/handle_register');

var app = express();

var db = require('./fn/db');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    helpers: {
        section: express_handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
    }
}));
app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname, 'server')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//
// session

var sessionStore = new MySQLStore({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    //port: 8889,
    user: 'b1c3dea7a9599d',
    password: 'ecf18b83',
    database: 'heroku_7aaf2925f12f4f6',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(handleLayoutMDW);

app.get('/', function (req, res) {
    res.redirect('/home');
});

app.use('/home', homeController);
app.use('/category', categoryController);
app.use('/product', productController);
app.use('/customer', customerController);
app.use('/search', searchController);
app.use('/producer', producerController);
app.use('/admin', adminController);
app.use('/cart',restrict, cartController);
app.use('/cart/add',restrict, cartController);
app.use('/receipt', receiptController);
app.use('/customer/register',register);


app.use(handle404MDW);

db.connect(db.MODE_PRODUCTION, function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(process.env.PORT || 3000);
    }
})
// app.listen(process.env.PORT || 3000);