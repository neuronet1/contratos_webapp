var mongoUrl = 'mongodb://localhost:27017/casas_pemex';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var trabajadores = require('./routes/trabajadores');
var  mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var expressHbs = require('express-handlebars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.engine('hbs', expressHbs({extname:'hbs' /*, defaultLayout:'main.hbs'*/}));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// inicio del cambio para no abrir la base cada que se invoca una ruta
var database = {
    contratos: [],
    ObjectID: ObjectID
};

mongodb.MongoClient.connect(mongoUrl, function (err, db) {
    console.log('OBTENIENDO LA BASE DE DATOS');
    database = {
        contratos: db.collection('contratos'),
        ObjectID: ObjectID
    };
});


// guardamos la base como una propiedad del request
// para poder accederla desde el router
app.use(function (req, res, next) {
    req.db = database;
    next();
});
// fin inicio del cambio



/*
// Abrimos la base y la guardamos como una propiedad del request
// para poder accederla desde el router
app.use(function (req, res, next) {
    mongodb.MongoClient.connect(mongoUrl, function (err, db) {
        //req.db = db;
        console.log('OBTENIENDO LA BASE DE DATOS');
        req.db = {
            contratos: db.collection('contratos'),
            ObjectID: ObjectID
        };
        next();
    });
});
*/

app.use('/', routes);

app.use('/users', users);
app.use('/trabajadores', trabajadores);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //res.send(err);
    res.render('error', {
        message: err.message,
        error: {}
    });

});



module.exports = app;

