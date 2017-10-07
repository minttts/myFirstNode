// create new file ./app/models/user.model.js
import mongoose from 'mongoose';
import crypto from 'crypto';
var Schema = mongoose.Schema; //create schema

var UserSchema = new Schema({ //json
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true, //told that primary(not same)
        required: 'Username is required',
        trim: true
    },
    email: { type: String, unique: true },
    password: {
        type: String,
        validate: [  //format of password ;ex. less than 6 char
            (password) => {
                return password &&
                    password.length >= 1;
            },
            'Password cannot be empty'
        ]
    },
    created: { //date of create
        type: Date,
        default: Date.now
    },
    salt: {   // about crypto
        type: String
    },
    provider: {  //about login with google,facebook
        type: String,
        default: 'local'
    },
    providerId: String,
    providerData: {}
});

// two function below is about save
UserSchema.pre('save', function (next) { //do before anything
    if (this.password) { //this.salt -> random 
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64'); //import crypto come in ,protect hack my info
        this.password = this.hashPassword(this.password);
    }
    next(); //save
});

UserSchema.methods.hashPassword = function (password) { //เอา password ที่เราทำไว้มาใช้
    return crypto.pbkdf2Sync(password, this.salt, 10000/* ให้ has กี่ครั้ง */, 64/* length */,'sha512').toString('base64');
}

UserSchema.methods.authenticate = function(password) { //check password true or false
    return this.password === this.hashPassword(password);
}
UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
               username: possibleUsername
    }, (err, user) => {
               if (!err) {
                      if (!user) callback(possibleUsername);
                      else {
           return _this.findUniqueUsername(username, (suffix || 0) + 1, callback );
                      }
               }
               else {
                      callback(null);
               }
    });
}

mongoose.model('User', UserSchema); //key is 'User' 