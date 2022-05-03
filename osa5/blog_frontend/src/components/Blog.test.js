import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogPosts from './BlogPosts'
import userEvent from '@testing-library/user-event'

describe('BlogPosts Component', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testi Taika',
    likes: 42,
    url: 'http://jabadabaduu.fi',

    user: {
      username: 'Testi test',
      name: 'Testi Taika'
    },
  }

  const user = {
    username: 'Testi Test',
    name: 'Testi Taika'
  }

  const handleDeletion = jest.fn().mockName('handleDeletion')
  const handleFrontLike = jest.fn().mockName('handleFrontLike')

  test('default renders only blog title and author', () => {
    console.log(blog)
    const { container } = render(<BlogPosts blog = { blog } user = { user } handleDeletion = {handleDeletion} handleFrontLike = {handleFrontLike} />)
    expect(container).toHaveTextContent( `${blog.title} ${blog.author}` )
  })

  test('view button click shows blogs info', async () => {
    const { container } = render(<BlogPosts blog = { blog } user = { user } handleDeletion = {handleDeletion} handleFrontLike = {handleFrontLike} />)

    const usertest  = userEvent.setup()
    const button = screen.getByText('view')
    await usertest.click(button)

    expect(container).toHaveTextContent(`${blog.title} ${blog.author} `)
    expect(container).toHaveTextContent(`${blog.likes}`)
    expect(container).toHaveTextContent(`${blog.url}`)
  })

  test('pressing like button 2 times, 2 eventhandlers', async () => {
    const { container } = render(<BlogPosts blog = { blog } user = { user } handleDeletion = {handleDeletion} handleFrontLike = {handleFrontLike} />)
    const usertest  = userEvent.setup()
    const button = screen.getByText('view')
    await usertest.click(button)

    const button1 = screen.getByText('like')
    await usertest.click(button1)

    await usertest.click(button1)

    expect(handleFrontLike.mock.calls).toHaveLength(2)

  })
})