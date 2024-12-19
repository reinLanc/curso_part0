import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'Bono postman 222',
    author: 'Bono Vox',
    url:'http://JWT.com',
    likes:10703,
    user:[
      {
        name:'Test User'
      }
    ]
  }


  render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} username="Test User" />)

  const title = screen.getByText('Bono postman 222 - Bono Vox')
  expect(title).toBeDefined()

  const url = screen.queryByText('http://JWT.com')
  const likes = screen.queryByText('Likes: 10703')
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('shows URL and likes when "view" button is clicked', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'Bono postman 222',
    author: 'Bono Vox',
    url:'http://JWT.com',
    likes:10703,
    user:[
      {
        name:'Test User'
      }
    ]
  }
  render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} username="Test User" />)
  const button = screen.getByText('View')
  await user.click(button)

  expect(screen.getByText('http://JWT.com')).toBeDefined()
  expect(screen.getByText('Likes: 10703')).toBeDefined()
})