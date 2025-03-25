jest.setTimeout(30000);

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');

let mongoServer;

describe('User Model', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test('Password should be hashed before saving a user', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      password: 'plainpassword',
    });

    await user.save();
    expect(user.password).not.toBe('plainpassword'); // Expect the password to be hashed
  });
});
