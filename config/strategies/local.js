// create new file ./config/strategies/local.js
import passport from 'passport';
import localStratege from 'passport-local';
var LocalStratege = localStratege.Strategy;//เรียกใช้ strategies
var User = require('mongoose').model('User');

module.exports = () => {
       passport.use(new LocalStratege((username, password, done) => { //จัดการ user ,password ด้วยตัวเอง //รับ user,pass เข้ามา เป็น new แล้วไปเช้คว่ามีอยู่จิงไหม
              User.findOne({ username: username }, (err, user) => { //check ว่ามีไหม ถ้ามี return กลับมา
                     if (err) { return done(err); }
                     if (!user || user.provider!='local' || !user.authenticate(password)) {
                            return done('Invalid username or password');
                     }//ถ้าไม่มี user จะมาทำที่นี่ provider ต้องเปน local  user.authenticateคือเช้คว่าถึงมีuserจิงแต่passถูกไหม
                     return done(null, user);//return ตัวจิงกลับไป
              });
       }));
}