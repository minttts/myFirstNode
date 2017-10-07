// create new file ./app/controllers/user.controller.js
var User = require('mongoose').model('User');
var path = require("path");

exports.getUsers = (req, res, next) => {
    User.find((err, user) => {  //หาว่ามีuserนี้มั้ย เอาข้อมูล user ทั้งหมดออกมา 
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Success');
            res.json(user);
        }
    });
}
exports.create = (req, res, next) => { 
    var user = new User(req.body);
    user.save((err) => {
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Success');
            res.json(user);
        }
    });
}
exports.login = (req, res) => {
    if (!req.user) {
           res.sendFile((path.join(__dirname+'/../views/login.html')));// full path ของ login
    }
    else {
           return res.redirect('/home');//ถ้า login ไว้แล้ว ให้ไป home
    }
}//เอา html มาแสดง 

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}
exports.saveOAuthUserProfile = (req, profile, done) => {
    User.findOne({
               provider: profile.provider,
               providerId: profile.providerId
    }, function(err, user) {
           if (err) return done(err);
           else {
                  if (!user) {
                         var possibleUsername = profile.username 
     || (profile.email ? profile.email.split('@')[0] : '');
                         console.log('NAME: ' + profile.username);
                 User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                         profile.username = availableUsername;
                         user = new User(profile);
                         user.save((err) => {
                                if (err) { return req.res.redirect('/login'); }
                                return done(err, user);
                         })
                     });
                  }
                 else { return done(err, user); }
            }
    });
}
