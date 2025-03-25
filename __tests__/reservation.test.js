const Reservation = require('../models/Reservation');

describe('Reservation Model', () => {
  test('Default status should be "pending"', () => {
    const reservation = new Reservation({
      user: '605c69f07b20254c4f9d47f5',
      book: '605c69f07b20254c4f9d47f6',
      startDate: new Date(),
    });

    expect(reservation.status).toBe('pending');
  });
});
