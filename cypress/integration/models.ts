import { faker } from '@faker-js/faker';

const phoneNumber = Math.floor(Math.random() * 10000000000);
const phone = phoneNumber.toString();

export const industrySelection = {
  key: 'cd4f577f-213a-41f8-ab02-f12e58162ebb',
  pos: '0-0-0-1',
  title: 'Tollywod',
  active: false,
  isLeaf: false,
  loaded: false,
  parent: 'e12e8f68-7d89-435e-8328-6befdc2bdc91',
  checked: false,
  loading: false,
  children: [],
  dragOver: false,
  expanded: false,
  selected: false,
  halfChecked: false,
  dragOverGapTop: false,
  dragOverGapBottom: false,
};

export const value = {
  key: 'fe613a58-70e2-417a-9f42-93d665869b51',
  title: 'Kollywood',
  isLeaf: false,
  parent: 'e12e8f68-7d89-435e-8328-6befdc2bdc91',
  children: [],
};

export const userSubCategory = {
  createdBy: faker.lorem.word(),
  updatedBy: faker.lorem.word(),
  key: faker.lorem.word(),
  value: [value],
  userId: 2,
};

export const userSubCategoryUpdateRecord = {
  id: 13,
  createdBy: faker.lorem.word(),
  updatedBy: faker.lorem.word(),
  key: faker.lorem.word(),
  value: [value],
  userId: 2,
};

export const userAndUserSubCategory = {
  email: faker.lorem.word() + '@gmail.com',
  firstName: faker.lorem.word(),
  lastName: faker.lorem.word(),
  createdBy: faker.lorem.word(),
  updatedBy: faker.lorem.word(),
  password: 'cybis@ban',
  phoneNumber: phone,
  userName: faker.lorem.word(),
  role: 'USER',
  status: 'ACTIVE',
  filmIndustry: 'sandalhood',
  industrySelection: [industrySelection],
  UserSubCategory: [userSubCategory, userSubCategoryUpdateRecord],
};

export const updateUserSubCategory = {
  createdBy: faker.lorem.word(),
  updatedBy: faker.lorem.word(),
  key: faker.lorem.word(),
  value: [],
  userId: 2,
};

export const User = {
  email: faker.lorem.word() + '@gmail.com',
  firstName: faker.lorem.word(),
  lastName: faker.lorem.word(),
  createdBy: faker.lorem.word(),
  updatedBy: faker.lorem.word(),
  password: 'cybis@ban',
  phoneNumber: phone,
  userName: faker.lorem.word(),
  role: 'USER',
  status: 'ACTIVE',
  filmIndustry: 'sandalhood',
  industrySelection: [industrySelection],
  step: 'step',
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
  industrySelection: [industrySelection],
};

export const errorMsg = {
  error: 'Not found user object',
  message: 'MISSING_USER',
  statusCode: 404,
};
