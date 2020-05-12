var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug'); // package for auto-creating URL slugs
var User = mongoose.model('User');

var ArticleSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  body: String,
  favoritesCount: {type: Number, default: 0},
  tagList: [{type: String}],
  // author id
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true, usePushEach: true});

// validate the slug is unique
ArticleSchema.plugin(uniqueValidator, {message: 'is already taken'});

// convert article title to a slug
ArticleSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
}

// generate slug before validation
ArticleSchema.pre('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

// return the data of our article
ArticleSchema.methods.toJSONFor = function(user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

// this is really slow, but it gives an accurate result.
// iterate over all users and count how many have this article in their favorite list
ArticleSchema.methods.updateFavoriteCount = function() {
  var article = this;
  console.log('about to count');
  return User.count({favorites: {$in: [article._id]}}).then(function(count){
    console.log('favoritescount', count);
    article.favoritesCount = count;
    return article.save();
  });
};

mongoose.model('Article', ArticleSchema);