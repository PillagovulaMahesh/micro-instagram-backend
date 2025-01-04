import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/config/database';
import { User } from '../src/models';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API Tests', () => {
  beforeEach(async () => {
    // Clear database before each test
    await User.destroy({ where: {} });
  });

  it('should get all users', async () => {
    await User.create({
      name: 'User One',
      mobile_number: '1234567890',
      address: '123 Main St',
      post_count: 0,
    });

    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return an empty array if no users exist', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
