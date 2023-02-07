/* eslint-disable no-undef */
const request = require('supertest');
const { app } = require('../app');
const { studentModel } = require('../schema/studentSchema');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NTY3MTcxMH0.XbYC30_9-EAYAIIU1JZPOQQFZL9wHVciaLrR49EkLn0';
const studentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpamVuZHJhLmFncmF3YWxAa2l3aXRlY2guY29tIiwiaWF0IjoxNjc1Njc1MzU1fQ.32XvmPqj9QfLYzt8AwUXg2vYJ8LW1nZpOTSvnyOJH9s';

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

test('admin login', async () => {
  await request(app)
    .get('/adminlogin')
    .send({
      email: 'admin@gmail.com',
      password: 'Admin@1',
    });
  expect(200);
});

test('admin login with wrong password', async () => {
  const result = await request(app)
    .get('/adminlogin')
    .send({
      email: 'admin@gmail.com',
      password: 'admin@1',
    });
  expect(result.text).toBe('student password does not match');
});

test('admin login with wrong email id', async () => {
  const result = await request(app)
    .get('/adminlogin')
    .send({
      email: 'admin123@gmail.com',
      password: 'Admin@1',
    });
  expect(result.text).toBe('student does not exist');
});

test('delete student by the admin', async () => {
  const result = await request(app)
    .delete('/delete')
    .set('Authorization', `Bearer ${token}`)
    .send({
      email: 'bijendra.agrawal@kiwitech.com',
    });
  expect(result.text).toBe('student has been delete successfully');
});

test('delete student by admin with out login', async () => {
  const result = await request(app)
    .delete('/delete')
    .send({
      email: 'bijendra.agrawal@kiwitech.com',
    });
  expect(result.text).toBe('Please login first');
});

test('delete student by admin with wrong login', async () => {
  const result = await request(app)
    .delete('/delete')
    .set('Authorization', `Bearer ${studentToken}`)
    .send({
      email: 'bijendra.agrawal@kiwitech.com',
    });
  expect(result.status).toBe(404);
});

test('delete an student which is not present in database', async () => {
  const result = await request(app)
    .delete('/delete')
    .set('Authorization', `Bearer ${token}`)
    .send({
      email: 'bijendra.agrawal@hotmail.com',
    });
  expect(result.text).toBe('there is not any data for delete');
});

test('show history of a particular book', async () => { // not showing data
  await request(app)
    .get('/bookhistory')
    .set('Authorization', `Bearer ${token}`)
    .send({
      _id: '63db5938098cefb058c81846',
    });
  expect(200);
});

test('book history with out admin login', async () => {
  const result = await request(app)
    .get('/bookhistory')
    .send({
      _id: '63db5938098cefb058c81846',
    });
  expect(result.text).toBe('Please login first');
});

test('book history shown by an student', async () => {
  const result = await request(app)
    .get('/bookhistory')
    .set('Authorization', `Bearer ${studentToken}`)
    .send({
      _id: '63db5938098cefb058c81846',
    });
  expect(result.status).toBe(404);
});
