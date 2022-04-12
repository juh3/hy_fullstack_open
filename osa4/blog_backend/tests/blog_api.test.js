const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
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
  expect(response.body[0]).toEqual({author:"Test Olento",
    title: "Testi Olennon blogi",
    id: "625566c5aa67033796983ac4",
    number: 404,
    url: "http://www.testiolennongblogi.fi"})
})

afterAll(() => {
  mongoose.connection.close()
})