var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../auth');

// if the route contains the username path parameter, fetch the user's profile
router.param('username', function(req, res, next, username) {
  // find the user with the username from the path
  User.findOne({username: username}).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.profile = user;

    return next();
  }).catch(next);
});

router.get('/:username', auth.optional, function(req, res, next) {
  // if the profile is being navigated to by a logged in user, 
  if (req.payload) {
    User.findById(req.payload.id).then(function(user) {
      if (!user) { return res.json({profile: req.profile.toProfileJSONFor(false)}); }

      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  } else {
    return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
});

// follow the given user
router.post('/:username/follow', auth.required, function(req, res, next){
  var profileId = req.profile._id;
  // grab the user from the request and call the follow method.
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.follow(profileId).then(function(){
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);
});

// unfollow the given user
router.delete('/:username/follow', auth.required, function(req, res, next){
  var profileId = req.profile._id;
  // find user, call unfollow request
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.unfollow(profileId).then(function(){
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  }).catch(next);
});

module.exports = router;