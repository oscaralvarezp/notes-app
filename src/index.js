// Importing node_modules dependencies
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initiliazations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) =>{
    res.locals.success = req.flash('success');
    res.locals.error_mgs = req.flash('error_mgs');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})
// Routes
app.use(require('./routes/index'));
app.use('/notes' , require('./routes/notes'));
app.use('/users', require('./routes/users'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server Start
app.listen(app.get('port'), () => {
    console.log(`App listen on port:${app.get('port')}`,`http://localhost:${app.get('port')}` );
});