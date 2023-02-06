/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../app');
const { studentModel } = require('../schema/studentSchema');

beforeAll(async () => {
  await studentModel.findOneAndDelete({ email: 'admin@gmail.com' });
});

test('create admin', async () => {
  await request(app).post('/admin').send({
    email: 'admin@gmail.com',
    name: 'Admin',
    password: 'Admin@1',
    contact: 7078439921,
    address: 'mathura uttar pradesh',
  });
  expect(200);
});

test('create admin again', async () => {
  const result = await request(app).post('/admin').send({
    email: 'admin@gmail.com',
    name: 'Admin',
    password: 'Admin@1',
    contact: 7078439921,
    address: 'mathura uttar pradesh',
  });
  expect(result.text).toBe('This admin id is already present');
});
