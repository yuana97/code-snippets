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

// favorite article
router.post('/:article/favorite', auth.required, function(req, res, next) {
  // extract id from posted article
  var articleId = req.article._id;
  console.log('articleId', articleId);
  console.log('payload.id', req.payload.id);

  // find posted user, favorite the article, update favorite count, and return article
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
    console.log('user', user);
  
    return user.favorite(articleId).then(function(){
      console.log('about to run updatefavoritecount');
      return req.article.updateFavoriteCount().then(function(article){
        return res.json({article: article.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// unfavorite. Ditto favorite method, but using user.unfavorite
router.delete('/:article/favorite', auth.required, function(req, res, next) {
  var articleId = req.article._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(articleId).then(function(){
      return req.article.updateFavoriteCount().then(function(article){
        return res.json({article: article.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// comment on an article
router.post('/:article/comments', auth.required, function(req, res, next) {
  // our auth middleware validates the user and puts the data in req.payload
  // find requesting user
  User.findById(req.payload.id).then(function(user){
    // DNE => 401 forbidden
    if (!user) { return res.sendStatus(401); }
    
    // comment obj
    var comment = new Comment(req.body.comment);
    comment.article = req.article;
    comment.author = user;

    // save comment to db and add to article comments list
    return comment.save().then(function() {
      req.article.comments.push(comment);
      // save article update and return comment
      return req.article.save().then(function(article) {
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// list comments on an article
router.get('/:article/comments', auth.optional, function(req, res, next){
  // grab user if logged in
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    // populate the comments and author of each comment (lookup data of an id) and return array
    // sorted by newest to oldest comment.
    return req.article.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(article) {
      // return JSON of each comment
      return res.json({comments: req.article.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});

// middleware to resolve :comment path variable
router.param('comment', function(req, res, next, id) {
  // grab comment by id and put it into the request
  Comment.findById(id).then(function(comment){
    if(!comment) { return res.sendStatus(404); }
    req.comment = comment;

    return next();
  }).catch(next);
});

router.delete('/:article/comments/:comment', auth.required, function(req, res, next) {
  // if requester=author remove comment from article, save schema, remove comment from db
  if (req.comment.author.toString() === req.payload.id.toString()) {
    req.article.comments.remove(req.comment._id);
    req.article.save()
      .then(Comment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
