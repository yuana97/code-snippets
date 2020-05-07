var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.post('/users', function(req, res, next) {
  // create a user, set its fields to the data from request
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  // save it in mongoDB and return user object w/ token
  user.save().then(function() {
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.post('/users/login', function(req, res, next) {
  // data validation
  if (!req.body.user.email) {
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if (!req.body.user.password) {
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info) {
    if (err){ return next(err); }
    // authenticate user and return profile w/ token or an error
    if (user) {
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.get('/user', auth.required, function(req, res, next) {
  console.log('/user req', req);
  // find requested user and return their profile as json
  User.findById(req.payload.id).then(function(user) {
    if (!user) { return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

// update user with new profile data
router.put('/user', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if (!user) { return res.sendStatus(401); }

    if (typeof req.body.user.username !== 'undefined') {
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.bio !== 'undefined') {
      user.bio = req.body.user.bio;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function() {
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

module.exports = router;