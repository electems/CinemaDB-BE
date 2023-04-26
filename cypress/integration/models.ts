import { faker } from '@faker-js/faker';

const phoneNumber = Math.floor(Math.random() * 10000000000);
const phone = phoneNumber.toString();

export const User = {
  email: faker.lorem.word() + '@gmail.com',
  firstName: faker.lorem.word(),
  lastName: faker.lorem.word(),
  password: 'cybis@ban',
  phoneNumber: phone,
  userName: faker.lorem.word(),
  role: 'USER',
  status: 'ACTIVE',
  filmIndustry: 'sandalhood',
};

export const updateUser = {
  createdAt: '2023-04-08T12:32:13.294Z',
  email: faker.lorem.word() + '@gmail.com',
  firstName: faker.lorem.word(),
  lastName: faker.lorem.word(),
  password: 'cybis@ban',
  phoneNumber: phone,
  userName: faker.lorem.word(),
  elapsedOTPTime: '2023-04-08T12:32:13.294Z',
  role: 'USER',
  status: 'ACTIVE',
  filmIndustry: 'sandalhood',
};

export const errorMsg = {
  error: "Not found user object",
  message: "MISSING_USER",
  statusCode: 404
};
