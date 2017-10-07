// create new file ./config/mongoose.js
//ไฟล์ที่เอาไว้จัดการกับพวกmongoose (พวก database)
//เอาไว้ให้คนอื่นมาเรียกใช้ไฟล์นี้เพื่อจัดการ db
//สร้างตัว config & connection
import mongoose from 'mongoose'; 
module.exports = function () {
    var config = require('./config');
    mongoose.set('debug', config.debug);
    const db = mongoose.connect(config.mongoUri, {
        useMongoClient: true
        /* other options */
    });
    require('../app/models/user.model');
    return db; //รีเทินตัวนี้กลับไปให้คนอื่นใช้
}