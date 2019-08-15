const express = require('express');

const router = express.Router();

const Posts = require('../data/db.js');

//  GET ALL POSTS

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved' });
  }
});

// GET POSTS BY ID

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post[0].id == req.params.id) {
      res.status(200).json(post);
    } else {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved' });
    }
  } catch {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' });
  }
});

// GET COMMENTS

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Posts.findPostComments(req.params.id);
    if (comments[0].post_id == req.params.id) {
      res.status(200).json(comments);
    } else {
      res
        .status(500)
        .json({ error: 'The comments information could not be retrieved.' });
    }
  } catch {
    res
      .status(404)
      .json({ message: 'The post witht he specified ID does not exist.' });
  }
});

// POST posts

router.post('/', async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    try {
      let posted = await Posts.insert(req.body);
      let newpost = await Posts.findById(posted.id);
      res.status(201).json(newpost);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'There was an eror while saving the post to the database'
      });
    }
  }
});

//POST comments

router.post('/:id/comments', async (req, res) => {
  const { text } = req.body;
  const post_id = req.params.id;
  const addcomment = { text, post_id };

  try {
    const post = await Posts.findById(req.params.id);
    if (post[0].id == req.params.id) {
      if (!text) {
        res
          .status(400)
          .json({ errorMessage: 'Please provide text for the comment' });
      } else {
        try {
          const posted = await Posts.insertComment(addcomment);
          const newcomment = await Posts.findCommentById(posted.id);
          res.status(201).json(newcomment);
        } catch {
          res.status(500).json({
            error: 'There was an error while saving the comment to the database'
          });
        }
      }
    }
  } catch {
    res.status(404).json({
      message: 'The post with the specified ID does not exist'
    });
  }
});

// DELETE post

router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post[0].id == req.params.id) {
      try {
        const deleted = await Posts.remove(req.params.id);
        res.status(200).json({ deleted, post });
      } catch {
        res.status(500).json({ error: 'The post could not be removed' });
      }
    }
  } catch {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' });
  }
});

// PUT update posts

router.put('/:id', async (req, res) => {
  const { title, contents } = req.body;

  try {
    const post = await Posts.findById(req.params.id);
    if (post[0].id == req.params.id) {
      if (!title || !contents) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      } else {
        try {
          const update = await Posts.update(req.params.id, req.body);
          if (update == 1) {
            const updatedpost = await Posts.findById(req.params.id);
            res.status(201).json(updatedpost);
          }
        } catch {
          res.status(500).json({
            error: 'The post information could not be modified'
          });
        }
      }
    }
  } catch {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' });
  }
});

module.exports = router;
