import express from 'express';
import {
  getAllPosts,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';

const router = express.Router();

// Route to get all posts
router.get('/', getAllPosts);

// Route to get all posts by a specific user
router.get('/user/:userId', getPostsByUser);

// Route to create a new post for a user
router.post('/', createPost);

// Route to update an existing post
router.put('/:postId', updatePost);

// Route to delete a post
router.delete('/:postId', deletePost);

export default router;
