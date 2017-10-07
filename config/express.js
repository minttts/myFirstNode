import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';

module.exports = function () {
    const app = express();

    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'));
    }
    else {
        app.use(compression());
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    })); // in postman can any type

    var config = require('./config'); //เอาไฟล์ config.js  เข้ามา
    app.use(session({//พาสปอรตเปนตัวจัดการการล๊อคอิน กับช่วยจัดการ session
        secret: config.sessionSecret,
        resave: false,
        saveUninitializeed: true
    })); //เอาไว้จัดการ session
    app.use(passport.initialize()); // start passport ประกาศตัวพาสปอรตว่าเริ่มทำงาน
    app.use(passport.session()); // use session via express-session เอามาใช้งานในพาสปอรต

    var path = require("path");
    app.set('views', path.join(__dirname + '/../app/views/home.html'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');

    require('../app/routes/index.route')(app);//import routing ต้องอยู่หลัง app.use 
    require('../app/routes/user.route')(app);

    return app;
}