const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connection = require('./connection');
const config = require('./config');
const session = require('express-session');
const mongoconnect = require('connect-mongo')(session);
passport.use(new localStrategy(


    function(username, password, done){

        connection(username, password).then(db=>{
            username = decodeURIComponent(username);
            db.db(config.db).command({usersInfo:{user:username, db:config.db}}).then(client=>{
              const user = {
                  client: client.users[0].user,
                  hives: client.users[0].customData.hives
              }
              
              db.close();
              return done(null, user);
            });
            
        }).catch(err=>{
            console.log(err);
            return done(null, false, {message: "unable to login"});
        })

    }

))

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


module.exports = passport;