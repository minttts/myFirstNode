// create new file ./config/env/development.js (2)
// and ./config/env/production.js (3)


module.exports = {
    // mongoUri: 'mongodb://localhost/myFirstNode', // uri ของ mongodb ที่เราจะ connect
    // or use
    mongoUri: 'mongodb://admin:password@localhost:27017/testDB1',
    debug: true, //debug log
    sessionSecret: 'dev_secret_key', //ใช้ในการทำ login logout
    google: {
        clientID: '2648605155-7mmmb4kqupotbspgi15gvtb0lhi8dfld.apps.googleusercontent.com',
        clientSecret: '257lQvuePcZjSXlv1gLGK8qJ',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }

}