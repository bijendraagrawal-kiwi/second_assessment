/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../app');
const { studentModel } = require('../schema/studentSchema');

beforeAll(async () => {
  await studentModel.deleteMany();
});

test('user signup', async () => {
  await request(app).post('/signup').send({
    email: 'bijendra.agrawal@kiwitech.com',
    name: 'Bijendra',
    rollNumber: '1806510017',
    password: 'Bijendra@1',
    contact: 9149082180,
    address: 'mathura uttar pradesh',
  }).expect(200);
});

test('user signup again', async () => {
  const object = await request(app).post('/signup').send({
    email: 'bijendra.agrawal@kiwitech.com',
    name: 'Bijendra',
    rollNumber: '1806510017',
    password: 'Bijendra@1',
    contact: 9149082180,
    address: 'mathura uttar pradesh',
  });
  expect(object.text).toBe('student has already an account please login');
});

test('user signup without information', async () => {
  const object = await request(app).post('/signup').send();
  expect(object.Error);
});

test('student login ', async () => {
  const object = await request(app).get('/login').send({
    email: 'bijendra.agrawal@kiwitech.com',
    password: 'Bijendra@1',
  });
  expect(object.text.token).not.toBeNull();
});

test('student login with wrong password', async () => {
  const object = await request(app).get('/login').send({
    email: 'bijendra.agrawal@kiwitech.com',
    password: 'bijendra@1',
  });
  expect(object.text).toBe('student password does not match');
});

test('student login without signup', async () => {
  const object = await request(app).get('/login').send({
    email: 'bijendra.agrawal@gmail.com',
    password: 'Bijendra@1',
  });
  expect(object.text).toBe('student does not exist');
});
