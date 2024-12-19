import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'


test('Calls createBlog with correct details when a new blog is create', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Enter Blog Title')
  const authorInput = screen.getByPlaceholderText('Enter Blog Author')
  const urlInput = screen.getByPlaceholderText('Enter Blog URL')
  const submitButton = screen.getByText('Create')

  await user.type(titleInput, 'New Blog Title')
  await user.type(authorInput, 'New Blog Author')
  await user.type(urlInput, 'http://newblog.com')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'New Blog Title',
    author: 'New Blog Author',
    url: 'http://newblog.com'
  })
})