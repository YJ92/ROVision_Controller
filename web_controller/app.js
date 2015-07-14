var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Seirlaport
var sp = require('serialport');
var UART1_port = "/dev/ttyO1";
var option = { baudrate : 9600 };
var UART_1 = new sp.SerialPort(UART1_port, option);

UART_1.on('open',function(){
  console.log("UART1 open\n");
  
  UART_1.on('data',function(data){
      // TODO
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var server = app.listen(52273,function(){
  console.log("Server is running at 52273 port");
});


// Socket.io

var io = require("socket.io").listen(server);

io.on('connection',function(socket){

  socket.on('keydown',function(data){

    switch(data){
      case 'up' :
        UART_1.write('S11E');
        console.log('up');
        break;
      case 'down' :
        UART_1.write('S22E');
        console.log('down');
        break;
      case 'left' :
        UART_1.write('S12E');
        console.log('left');
        break;
      case 'right' :
        UART_1.write('S21E');
        console.log('right');
        break;
      }

    });

    socket.on('keyup',function(data){

      UART_1.write('S00E');
      console.log('stop');

    });

});