const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const User = require('../models/User');

describe('Notification Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
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
