const express = require('express');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./router/client/index.route');
const routeAdmin = require('./router/admin/index.route')
const systemConfig = require('./config/system')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path');
//connet db
const database = require('./config/database');
database.connect();

// dotenv
require('dotenv').config()
const port = process.env.PORT;

const app = express();

// method-override must after declare app
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Show notifications
app.use(cookieParser('KLAHSHUBCBSIIOS'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// use engine pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//static file
app.use(express.static(path.join(__dirname, '..', 'public')));

//config routes
routes(app)
routeAdmin(app)

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin





app.listen(port, () => { console.log(`Example app listening on port ${port}`) })