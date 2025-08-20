const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction');

describe('Transaction Routes', () => {
  let token, userId;

  beforeEach(async () => {
    await User.deleteMany({});
    await Transaction.deleteMany({});
    const user = await User.create({ 
      name: 'payme', 
      email: 'payme@example.com', 
      accountType: 'savings', 
      password: '123456',
      balance:1000
    });
    userId = user._id;
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  });

  it('should make transactions', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'credit', amount: 200 });

    expect(res.statusCode).toBe(201);
    expect(res.body.createTrans.type).toBe('credit');
    expect(res.body.createTrans.amount).toBe(200);
  });

  it('should not allow debit more than balance', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'debit', amount: 2000 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Insufficient Balance');
  });

  it('should get all the transactions with pagination', async () => {
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post('/api/transactions')  
        .set('Authorization', `Bearer ${token}`)
        .send({ type: 'credit', amount: 200 });
    }

    const res = await request(app)
      .get('/api/transactions?page=1&limit=10')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.getTransaction.length).toBe(5);
  });

  it('should get a single transaction by ID', async () => {
    const created = await request(app)
      .post('/api/transactions')  
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'credit', amount: 200 });

    const transactionId = created.body.createTrans._id;

    const res = await request(app)
      .get(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`);
     
    expect(res.statusCode).toBe(200);
    expect(res.body.transaction._id).toBe(transactionId);
  });

  it('should update transaction by ID', async () => {
    const created = await request(app)
      .post('/api/transactions')  
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'credit', amount: 200 });

    const transactionId = created.body.createTrans._id;

    const res = await request(app)
      .put(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'debit', amount: 100 });
     
    expect(res.statusCode).toBe(200);
    expect(res.body.transaction.amount).toBe(100);
  });

  it('should delete transaction by ID', async () => {
    const created = await request(app)
      .post('/api/transactions')  
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'credit', amount: 200 });

    const transactionId = created.body.createTrans._id;

    const res = await request(app)
      .delete(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`);
     
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Transaction deleted successfully');
  });

});
