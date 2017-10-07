// create new file ./app/route/user.route.js

import passport from 'passport';

var user = require('../controllers/user.controller'); // require user

module.exports = (app) => {
    var path = '/api/user';

    app.get(path + '/getuser', user.getUsers/* ใช้ getuser ของ จำพวก user */);
    app.post(path + '/signup', user.create);

    app.route('/login')//app.route คือการรวมคำสั่ง .get .postบลาๆ
        .get(user.login)//login
        .post(passport.authenticate('local', {//check login
            successRedirect: '/home',//home.html
            failureRedirect: '/login',//login page
            failureFlash: true //error login ตัวแดงๆ
        }));

    app.post('/logout', user.logout);//logoutใช้แค่postก้พอ
    app.get('/oauth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        failureRedirect: '/login'
    }));

    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/home'
    }));
}


