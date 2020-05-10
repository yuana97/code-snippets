var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var auth = require('../auth');

// create articles endpoint
router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
    // create Article from request data
    var article = new Article(req.body.article);
    // mark article author
    article.author = user;
    // save article in db and return article object
    return article.save().then(function(){
      console.log(article.author);
      return res.json({article: article.toJSONFor(user)});
    });
  }).catch(next);
});

// router.param is an Express method to apply middleware to, in this case,
// requests with an :article path parameter. Our middleware prepopulates
// req.article with the article data before passing it to our endpoints
router.param('article', function(req, res, next, slug) {
  // read the slug path param and look up the article
  Article.findOne({ slug: slug })
    // look up the author id and replace it with the author object
    .populate('author')
    .then(function (article) {
      // set the article and pass it to the next middleware/endpoint
      if (!article) { return res.sendStatus(404); }
      req.article = article;
      return next();
    }).catch(next);
});

// GET /:article endpoint reads an article
router.get('/:article', auth.optional, function(req, res, next) {
  // grab the current user and article author
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.article.populate('author').execPopulate()
  ]).then(function(results){
    // return article JSON
    var user = results[0];
    return res.json({article: req.article.toJSONFor(user)});
  }).catch(next);
});

// PUT /:article endpoint to update articles
router.put('/:article', auth.required, function(req, res, next) {
  // look up the user
  User.findById(req.payload.id).then(function(user){
    // if requester = article author, reset the article fields with data from request
    if (req.article.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.article.title !== 'undefined'){
        req.article.title = req.body.article.title;
      }

      if(typeof req.body.article.description !== 'undefined'){
        req.article.description = req.body.article.description;
      }

      if(typeof req.body.article.body !== 'undefined'){
        req.article.body = req.body.article.body;
      }

      req.article.save().then(function(article){
        return res.json({article: article.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// DELETE /:article to delete an article
router.delete('/:article', auth.required, function(req, res, next) {
  // look up requesting user, if it matches author, delete the article from db
  User.findById(req.payload.id).then(function(){
    if(req.article.author._id.toString() === req.payload.id.toString()){
      return req.article.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  });
});

module.exports = router;
