// tests/auth.test.js

const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

process.env.JWT_SECRET = "testsecret";  

describe('Auth Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
      name: 'testuser',
      email: 'test@example.com',
      accountType: 'savings',
      password: '123456'
    });
    await user.save(); // ensures password is hashed
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'newuser', email: 'new@example.com', accountType: 'savings', password: '123456' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.name).toBe('newuser');
    expect(res.body.email).toBe('new@example.com');
    expect(res.body.accountType).toBe('savings');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toBe('test@example.com');
  });

  it('should get balance with a valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ name: 'testuser', email: 'test@example.com', password: '123456' });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/balance')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('balance');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'testuser', email: 'test@example.com', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid Credentials');
  });
});
