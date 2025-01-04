import { Request, Response } from 'express';
import { Post, User } from '../models';

// Get all posts (with user details)
export const getAllPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts by a specific user
export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({ where: { user_id: userId }, include: User });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new post for a user
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, images, user_id } = req.body;

    // Ensure the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the post
    const newPost = await Post.create({ title, description, images, user_id });

    // Increment the user's post count
    user.post_count += 1;
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, description, images } = req.body;

    // Find the post
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post details
    post.title = title || post.title;
    post.description = description || post.description;
    post.images = images || post.images;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    // Find the post
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Decrement the user's post count
    const user = await User.findByPk(post.user_id);
    if (user) {
      user.post_count -= 1;
      await user.save();
    }

    // Delete the post
    await post.destroy();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
