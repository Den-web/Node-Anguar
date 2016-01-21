/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {

    var params = {
      description : req.param('description'),
      content     : req.param('content'),
      title       : req.param('title'),
    }

    Post.create(params).exec(function (err, post) {
      res.redirect('/post/watch/' + post.id);
      if (err) return res.send(500);
    });

  }

  update: function (req, res) {
    var Id = req.param('id');

    var elem = {
      description : req.param('description'),
      content : req.param('content'),
      title : req.param('title')
    };

    Post.update(Id, elem).exec(function (err) {
      if (err) return res.send(500);
      res.redirect('/');
    });

  }

  delete: function (req, res) {
    var Id = req.param('id');
    Post.destroy(Id).exec(function (err) {
      if (err) return res.send(500);
      res.redirect('/post');
    });
  }

};

