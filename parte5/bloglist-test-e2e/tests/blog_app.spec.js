const { describe, test, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/reset')
    await request.post('http://localhost:3003/api/users', {
      data: { username: 'test-user', password: 'pwd', name: 'test guy' }
    })
    await page.goto('http://localhost:5173')
  })

  describe('Login', () => {
    test('Login form is shown', async ({ page }) => {
      await expect(page.locator('form')).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('test-user')
      await page.getByTestId('password').fill('pwd')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('test guy logged in')).toBeVisible()
      await expect(page.locator('#notification-message')).toHaveText('Login successful')
      await expect(page.locator('#logout')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('wronguser')
      await page.getByTestId('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.locator('#notification-message')).toHaveText('Wrong username or password')
      await expect(page.locator('#notification-message')).toHaveCSS('border-style', 'solid')
      await expect(page.locator('#notification-message')).toHaveCSS('border-radius', '5px')
      await expect(page.getByText('test guy logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('test-user')
      await page.getByTestId('password').fill('pwd')
      await page.click('#login')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog!' }).click()
      await page.getByTestId('Title').fill('Test Blog 2')
      await page.getByTestId('Author').fill('Test Author')
      await page.getByTestId('URL').fill('http://testurl.com')
      await page.click('#create')
      await expect(page.locator('.blog', { hasText: 'Test Blog 2' }).first()).toBeVisible()
    })

    test('clicking the like button increases the number of likes', async ({ page }) => {
      await page.click('#view')
      await page.click('#like')
      await expect(page.getByText('Likes: 0')).not.toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog!' }).click()
      await page.getByTestId('Title').fill('Test Blog 5')
      await page.getByTestId('Author').fill('Test Author')
      await page.getByTestId('URL').fill('http://testurl.com')
      await page.click('#create')
      const blog = await page.locator('.blog', { hasText: 'Test Blog 5' }).first()
      await expect(blog).toBeVisible()
      page.on('dialog', async dialog => {
        expect(dialog.message()).toBe(`Remove blog 'Test Blog 5' by 'Test Author'?`)
        await dialog.accept()
      })
      await blog.locator('button', { hasText: 'delete' }).click()
      await expect(blog).not.toBeVisible()
    })

    test('only the creator can see the delete button', async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: { username: 'test-user1', password: 'pwd', name: 'Test User 1' }
      })
      await request.post('http://localhost:3003/api/users', {
        data: { username: 'test-user2', password: 'pwd', name: 'Test User 2' }
      })
      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('test-user1')
      await page.getByTestId('password').fill('pwd')
      await page.click('#login')
      await page.getByRole('button', { name: 'Create new blog!' }).click()
      await page.getByTestId('Title').fill('Test Blog 6')
      await page.getByTestId('Author').fill('Test Author')
      await page.getByTestId('URL').fill('http://testurl.com')
      await page.click('#create')
      const blog = await page.locator('.blog', { hasText: 'Test Blog 6' }).first()
      const deleteButton = blog.locator('button', { hasText: 'delete' })
      await expect(deleteButton).toBeVisible()
      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('test-user2')
      await page.getByTestId('password').fill('pwd')
      await page.click('#login')
      const secondUserBlog = await page.locator('.blog', { hasText: 'Test Blog 6' }).first()
      const secondUserDeleteButton = secondUserBlog.locator('button', { hasText: 'delete' })
      await expect(secondUserDeleteButton).not.toBeVisible()
    })

    test('blogs are ordered by number of likes', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog!' }).click()
      await page.getByTestId('Title').fill('Test Blog 7')
      await page.getByTestId('Author').fill('Test Author')
      await page.getByTestId('URL').fill('http://testurl.com')
      await page.click('#create')
      await page.getByRole('button', { name: 'Create new blog!' }).click()
      await page.getByTestId('Title').fill('Test Blog 8')
      await page.getByTestId('Author').fill('Test Author')
      await page.getByTestId('URL').fill('http://testurl.com')
      await page.click('#create')
      await page.getByRole('button', { name: 'Create new blog!' }).click()
      await page.getByTestId('Title').fill('Test Blog 9')
      await page.getByTestId('Author').fill('Test Author')
      await page.getByTestId('URL').fill('http://testurl.com')
      await page.click('#create')
      const blog7 = await page.locator('.blog', { hasText: 'Test Blog 7' })
      const blog8 = await page.locator('.blog', { hasText: 'Test Blog 8' })
      const blog9 = await page.locator('.blog', { hasText: 'Test Blog 9' })
      await blog7.locator('button', { hasText: 'Like' }).click()
      await blog8.locator('button', { hasText: 'Like' }).click()
      await blog8.locator('button', { hasText: 'Like' }).click()
      await blog9.locator('button', { hasText: 'Like' }).click()
      await blog9.locator('button', { hasText: 'Like' }).click()
      const blogs = await page.locator('.blog')
      const firstBlogLikes = await blogs.nth(0).locator('.likes').textContent()
      const secondBlogLikes = await blogs.nth(1).locator('.likes').textContent()
      const thirdBlogLikes = await blogs.nth(2).locator('.likes').textContent()
      expect(parseInt(firstBlogLikes)).toBeGreaterThan(parseInt(secondBlogLikes))
      expect(parseInt(secondBlogLikes)).toBeGreaterThan(parseInt(thirdBlogLikes))
    })
  })
})
