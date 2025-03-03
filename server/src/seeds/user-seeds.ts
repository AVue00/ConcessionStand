import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'Vijay', password: 'password' },
    { username: 'Alex_V', password: 'password' },
    { username: 'Alex_P', password: 'password' },
  ], { individualHooks: true });
};
