const express = require('express');

const router = express.Router();

const Posts = require('../data/db.js');

//  GET ALL POSTS
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

// GET POSTS BY ID

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post[0].id == req.params.id) {
        res.status(200).json(post);
      } else {
        res
          .status(500)
          .json({ error: 'The post information could not be retrieved.' });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    });
});

// GET COMMENTS

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(comments => {
      if (comments[0].post_id == req.params.id) {
        res.status(200).json(comments);
      } else {
        res
          .status(500)
          .json({ error: 'The comments information could not be retrieved.' });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    });
});

// POST posts

router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    Posts.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

//POST comments

router.post('/:id/comments', (req, res) => {
  const { text } = req.body;
  const post_id = req.params.id;
  const newcomment = { text, post_id };

  if (!text) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide text for the comment.' });
  } else {
    Posts.insertComment(newcomment)
      .then(comment => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res.status(500).json({
            error: 'There was an error while saving the comment to the database'
          });
        }
      })
      .catch(err => {
        res.status(404).json({
          success: false,
          message: 'The post with the specified ID does not exist.'
        });
      });
  }
});

// DELETE post

router.delete('/:id', (req, res) => {
  Posts.findById(req.params.id)

    .then(post => {
      if (post[0].id == req.params.id) {
        const deletedpost = post;
        Posts.remove(req.params.id)
          .then(() => {
            res.status(200).json(deletedpost);
          })
          .catch(err => {
            res.status(500).json({ error: 'The post could not be removed' });
          });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    });
});

// PUT update posts

router.put('/:id', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    Posts.update(req.params.id, req.body)
      .then(post => {
        if (post == 1) {
          res.status(200).json(req.body);
        } else {
          res
            .status(500)
            .json({ error: 'The post information could not be modified.' });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  }
});

module.exports = router;
