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

module.exports = router;