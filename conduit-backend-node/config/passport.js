var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// authenticate an incoming login request
passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  // find the User with this email and make sure the password is correct
  User.findOne({email: email}).then(function(user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));
