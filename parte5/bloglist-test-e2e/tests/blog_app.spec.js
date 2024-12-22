const { describe, test, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async({page, request}) => {
        await request.post('http://localhost:3003/api/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'test-user',
                password: 'pwd',
                name: 'test guy'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({page}) => {
        const loginForm = await page.locator('form')
        await expect(loginForm).toBeVisible()
    })

    test('succeeds with correct credentials', async({page}) => {
        await page.getByTestId('username').fill('test-user')
        await page.getByTestId('password').fill('pwd')
        await page.getByRole('button',{name: 'login'}).click()
        await expect(page.getByText('test guy logged in')).toBeVisible()
        const successMessage = await page.locator('#notification-message')
        await expect(successMessage).toHaveText('Login successful')
        const logoutButton = await page.locator('#logout');
        await expect(logoutButton).toBeVisible()
    })
    
    test('fails with wrong credentials', async({page}) => {
        await page.getByTestId('username').fill('wronguser')
        await page.getByTestId('password').fill('wrongpassword')
        await page.getByRole('button',{name: 'login'}).click()
        const errorMessage = await page.locator('#notification-message')
        await expect(errorMessage).toHaveText('Wrong username or password')
        await expect(errorMessage).toHaveCSS('border-style', 'solid')
        await expect(errorMessage).toHaveCSS('border-radius', '5px')
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
      await page.getByRole('button',{ name: 'Create new blog!' }).click()
      await page.getByTestId('Title').fill('Test Blog')
      await page.getByTestId('Author').fill('Test Author')
      await page.getByTestId('URL').fill('http://testurl.com')
      await page.click('#create')
      const createdBlog = await page.locator('.blog', { hasText: 'Test Blog' }).first()
      await expect(createdBlog).toBeVisible()
    })
  })
