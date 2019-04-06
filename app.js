const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 2000;
const db = require('./auth/mongoAuth');
db();
const indexRouter = require('./router/index');
const userRouter = require('./router/user');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/img')));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'views/script')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.listen(port, () => {
    console.log(`formicaeLab server is running on port ${port}!`);
});