const User = require('../models/User');

describe('User Model', () => {
  test('Password should be hashed before saving a user', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      password: 'plainpassword',
    });

    await user.save();
    expect(user.password).not.toBe('plainpassword'); // Password should be hashed
  });
});
