import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/config/database';
import { User, Post } from '../src/models';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Post API Tests', () => {
  let userId: number;

  beforeEach(async () => {
    // Create a test user
    const user = await User.create({
      name: 'Test User',
      mobile_number: '1234567890',
      address: '123 Test Lane',
      post_count: 0,
    });
    userId = user.id;
  });

  it('should create a post for a user', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Test Post',
        description: 'This is a test post',
        images: ['image1.jpg', 'image2.jpg'],
        user_id: userId,
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Post');
  });

  it('should get all posts', async () => {
    await Post.create({
      title: 'Test Post',
      description: 'This is a test post',
      images: ['image1.jpg', 'image2.jpg'],
      user_id: userId,
    });

    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get all posts by a specific user', async () => {
    await Post.create({
      title: 'User Specific Post',
      description: 'This is a user-specific post',
      images: ['image1.jpg'],
      user_id: userId,
    });

    const response = await request(app).get(`/api/posts/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should update a post', async () => {
    const post = await Post.create({
      title: 'Old Title',
      description: 'Old Description',
      images: ['old_image.jpg'],
      user_id: userId,
    });

    const response = await request(app)
      .put(`/api/posts/${post.id}`)
      .send({
        title: 'Updated Title',
        description: 'Updated Description',
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });

  it('should delete a post', async () => {
    const post = await Post.create({
      title: 'Post to Delete',
      description: 'This post will be deleted',
      images: ['image_to_delete.jpg'],
      user_id: userId,
    });

    const response = await request(app).delete(`/api/posts/${post.id}`);
    expect(response.status).toBe(200);
    const deletedPost = await Post.findByPk(post.id);
    expect(deletedPost).toBeNull();
  });
});
