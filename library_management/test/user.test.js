/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../app');
const { studentModel } = require('../schema/studentSchema');

beforeAll(async () => {
  await studentModel.deleteMany();
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpamVuZHJhLmFncmF3YWxAa2l3aXRlY2guY29tIiwiaWF0IjoxNjc1Njc1MzU1fQ.32XvmPqj9QfLYzt8AwUXg2vYJ8LW1nZpOTSvnyOJH9s';

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
  expect(object.text).not.toBeNull();
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

test('book assign to the user', async () => {
  await new studentModel({
    email: 'bijendra.agrawal@kiwitech.com',
    name: 'Bijendra',
    rollNumber: '1806510017',
    password: 'Bijendra@1',
    contact: 9149082180,
    address: 'mathura uttar pradesh',
  }).save();
  await request(app)
    .put('/asignbook')
    .set('Authorization', `Bearer ${token}`)
    .send({
      bookId: 1,
      bookName: 'Math',
      authorName: 'bijendra',
    });
  expect(200);
});

test('book assign to the user which is not in library', async () => {
  const result = await request(app)
    .put('/asignbook')
    .set('Authorization', `Bearer ${token}`)
    .send({
      bookId: 2,
      bookName: 'English',
      authorName: 'R.K. Narayan',
    });
  expect(result.text).toBe('This book is not our library. Please choose another book');
});

test('book assign to the user with out user login', async () => {
  const result = await request(app)
    .put('/asignbook')
    .send({
      bookId: 2,
      bookName: 'English',
      authorName: 'R.K. Narayan',
    });
  expect(result.text).toBe('Please login first');
});

test('detail of asign book of student', async () => {
  await request(app)
    .get('/getasignbooks')
    .set('Authorization', `Bearer ${token}`)
    .send();
  expect(200);
});

test('submit book', async () => {
  await request(app)
    .put('/submitbook')
    .set('Authorization', `Bearer ${token}`)
    .send({
      bookName: 'Math',
      authorName: 'bijendra',
    });
  expect(200);
});

test('get the expire book', async () => {
  await request(app)
    .get('/expirebook')
    .set('Authorization', `Bearer ${token}`)
    .send();
  expect(200);
});
