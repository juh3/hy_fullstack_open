const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bloglist = require('../models/bloglist')

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
    likes: 404,
    url: "http://www.testiolennongblogi.fi"})
})

test('the blog has a field called id', async () => {
  const response = await api.get('/api/bloglists')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[1].id).toBeDefined()
})

test('POST adds a blog', async () => {
  const newBlog = {
    author: 'Kalle Devaaja',
    title: 'Enter SandMan' ,
    likes: 42 ,
    url:'http://www.hiekkadevaus.fi'
  }

  await api
  .post('/api/bloglists')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/bloglists')
  const addedblog = response.body.map(x => x.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(addedblog).toContain('Enter SandMan')

})

  test('POST a blog with no like field returns as 0 likes', async() => {
    const newBlog = {
      author: 'Kalle Kaikumaa',
      title: 'React js pro' ,
      url:'http://www.tuleproreactjscäshmoneyjees.fi'
    }

    await api
    .post('/api/bloglists')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/bloglists')
    const addedblog = response.body.map(x => x.likes)
    expect(addedblog).toContain(0)
  })

  test('POST request with missing title&author ends with 400', async() => {
    const newBlog = {
      likes: 3214,
      url:'http://www.hunajasimaastadista.fi'
    }
    
    await api
    .post('/api/bloglists')
    .send(newBlog)
    .expect(400)

  })
afterAll(() => {
  mongoose.connection.close()
})