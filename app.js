var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var API = require('../sg-gov-nea/');
var lib = require('../sg-gov-nea/sg-gov-nea.js');

console.log(API);

var api = new API(new lib.sg.gov.nea.APIConfig({key: '781CF461BB6606AD28A78E343E0E4176B76D27C9922DDDB4'}));

//var dataSet = api.connect(lib.sg.gov.nea.DataSet.PSI_UPDATE);
//dataSet.on(lib.sg.gov.nea.APIEvent.DATA, function (data) {
//    console.log(data);
//})

var dataSet = api.connect(lib.sg.gov.nea.DataSet.NOWCAST);
dataSet.on(lib.sg.gov.nea.APIEvent.DATA, function (data) {
    console.log(data);
})

module.exports = app;
