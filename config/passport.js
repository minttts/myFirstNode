import passport from 'passport';
import mongoose from 'mongoose';

module.exports = () => {
       var User = mongoose.model('User'); //เช็คว่า user มีอยู่จริงไหม

       passport.serializeUser((user, done) => {//passport เอาuser.id ไปเก็บใน cookie browser
              done(null, user.id); 
              // after authenticate, save user.id in cookie on browser
       });

       passport.deserializeUser((id, done) => { //ถ้าเคยทำการล้อคอินไว้ จะสามารถเข้าได้เลย โดนไม่ต้องใส่user pass ใหม่
              User.findOne({ _id: id }, '-password -salt', (err, user) => {
                     done(err, user); // get user from database by id
              });
       }); 

       require('./strategies/local')();
       require('./strategies/google')();
       
       
}
