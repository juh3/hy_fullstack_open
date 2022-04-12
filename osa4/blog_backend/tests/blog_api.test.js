const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/bloglists')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/bloglists')

  expect(response.body).toHaveLength(2)
})

test('the first blog is about Testi Olennon blogi', async () => {
  const response = await api.get('/api/bloglists')

  expect(response.body[0].content).toEqual({author:"Test Olento",
    title: "Testi Olennon blogi",
    number: "404",
    url: "http://www.testiolennongblogi.fi"})
})

afterAll(() => {
  mongoose.connection.close()
})