/* eslint-disable no-undef */

const request = require('supertest');
const { app } = require('../app');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3NTY3MTcxMH0.XbYC30_9-EAYAIIU1JZPOQQFZL9wHVciaLrR49EkLn0';

test('add new book in the library', async () => {
  await request(app)
    .post('/addbook')
    .set('Authorization', `Bearer ${token}`)
    .send({
      bookId: 3,
      bookName: 'The India Story',
      authorName: 'Bimal Jalal',
    });
  expect(200);
});

test('add new book in the library with out admin login', async () => {
  const result = await request(app)
    .post('/addbook')
    .send({
      bookId: 3,
      bookName: 'The India Story',
      authorName: 'Bimal Jalal',
    });
  expect(404);
  expect(result.text).toBe('Please login first');
});

test('add book which is already in library', async () => {
  const result = await request(app)
    .post('/addbook')
    .set('Authorization', `Bearer ${token}`)
    .send({
      bookId: 3,
      bookName: 'The India Story',
      authorName: 'Bimal Jalal',
    });
  expect(result.text).toBe('Book is already in library');
});

test('delete book from library', async () => {
  const result = await request(app)
    .delete('/deletebook')
    .set('Authorization', `Bearer ${token}`)
    .send({
      bookId: 3,
      bookName: 'The India Story',
    });
  expect(result.text).toBe('book has been delete successfully');
});

test('delete a book in library without admin login', async () => {
  const result = await request(app)
    .delete('/deletebook')
    .send({
      bookId: 3,
      bookName: 'The India Story',
    });
  expect(404);
  expect(result.text).toBe('Please login first');
});

test('delete a book which is not in library', async () => {
  const result = await request(app)
    .delete('/deletebook')
    .set('Authorization', `Bearer ${token}`)
    .send({
      bookId: 4,
      bookName: '‘Listen to Your Heart: The London Adventure’',
    });
  expect(result.text).toBe('there is not any data for delete');
});
