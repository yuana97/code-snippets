var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
// JWT for user
var jwt = require('jsonwebtoken');
// secret to sign the JWT
var secret = require('../config').secret;

// schema representing user data
// we validate and index by username and email
var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    bio: String,
    image: String,
    hash: String,
    salt: String,
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {timestamps: true, usePushEach: true}
);

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// push article id to favorites list and save the state of the user
UserSchema.methods.favorite = function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites = this.favorites.concat([id]);
    console.log('favorites after favoriting', this.favorites);
    console.log('article id', id);
  }
  return this.save();
};

// remove article from favorites list and save state
UserSchema.methods.unfavorite = function (id) {
  this.favorites.remove(id);
  return this.save();
};

// check if the favoriteid is
UserSchema.methods.isFavorite = function (id) {
  return this.favorites.some(function (favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

// record a salt and hash for the password
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

// hash the input password with respect to the salt and see
// if it matches the set hash
UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

// generate a JWT
UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

// send user object to front end
UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image,
  };
};

// add user to the followed list
UserSchema.methods.follow = function(id){
  if (this.following.indexOf(id) === -1){
    this.following = this.following.concat([id]);
  }
  return this.save();
}

// remove the user from the followed list
UserSchema.methods.unfollow = function(id){
  this.following.remove(id);
  return this.save();
}

// see if we're following this user
UserSchema.methods.isFollowing = function(id){
  return this.following.some(function(followId){
    return followId.toString() === id.toString();
  })
}

UserSchema.methods.toProfileJSONFor = function (user) {
  return {
    username: this.username,
    bio: this.bio,
    image:
      this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    // true if we're following the given user, false otherwise
    following: user ? user.isFollowing(this._id) : false,
  };
};

// register the schema with mongoose as 'User'
mongoose.model('User', UserSchema);
