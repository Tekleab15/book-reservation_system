jest.setTimeout(30000); // Extend timeout as needed

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Notification = require('../models/Notification');
const User = require('../models/User');

let mongoServer;

describe('Notification Model', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create(); // Start the in-memory server
    const uri = mongoServer.getUri();
    await mongoose.connect(uri); // No need for extra options in Mongoose v6+
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test('Notification should reference a valid user', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
    });

    const notification = await Notification.create({
      user: user._id,
      message: 'Welcome!',
      type: 'new_user',
    });

    expect(notification.user.toString()).toBe(user._id.toString());
  });
});
