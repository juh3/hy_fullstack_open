const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Bloglist = require('../models/bloglist')
const { update } = require('lodash')

const api = supertest(app)

beforeEach(async () => {
  await Bloglist.deleteMany({})
  await Bloglist.insertMany(helper.initialBlogs)
})

describe('initial notes are saved and fetched correctly', () => {

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
    const titles = response.body.map(x => x.title)
    expect(titles).toContain('Testi Olennon blogi')
})
})

describe('specific parameters exists', () => {
  test('the blog has a field called id', async () => {
    const response = await api.get('/api/bloglists')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
  })
})

describe('different POST request work', () => {

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
})

describe('The blog updates', () => {
  test('Like updates work if blog exists', async() => {
    const blogs = await helper.blogsInDb()
    id = blogs[0].id
    await api
      .put(`/api/bloglists/${id}`)
      .send({likes:132})
      .expect(200)
    const updatedblogs = await helper.blogsInDb()
    const updatedBlog = updatedblogs[0]
    expect(updatedBlog.likes).toBe(132)    
    expect(updatedblogs).toHaveLength(blogs.length)  
  })

  test('Trying to update non-existing blog', async() => {
    const blogs = await helper.blogsInDb()
    const id = mongoose.Types.ObjectId()
    await api
      .put(`/api/bloglists/${id}`)
      .send({likes:132})
      .expect(400)
  })
})

describe('Delete request deletes the blog', () => {

  test('delete works', async() => {
   
    const deleteBlog_id = "6255674baa67033796983ac5"
    await api
    .delete(`/api/bloglists/${deleteBlog_id}`)
    .expect(204)

    const response = await api.get('/api/bloglists')
    expect(response.body).not.toContain('testauksen iloa')



  })
})

afterAll(() => {
  mongoose.connection.close()
})