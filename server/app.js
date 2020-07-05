const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =  require('cors');
const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "text/plain" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

process.on('uncaughtException', function (err) {
    console.log(err.stack);            
    console.log(`uncaught error: ${err.message}`)    
});

// routers
var api = require('./routes/api');
var users = require('./routes/users');

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))

app.use('/api', api);
app.use('/users', users);