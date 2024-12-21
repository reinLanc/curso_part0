const { describe, test, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async({page, request}) => {
        await request.post('http://localhost:3003/api/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'testuser',
                password: 'password',
                name: 'testuser'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({page}) => {
        const loginForm = await page.locator('form')
        await expect(loginForm).toBeVisible()
    })

    test('succeeds with correct credentials', async({page}) => {
        await page.fill('#username', 'testuser')
        await page.fill('#password', 'password')
        await page.click('#login-button')
        await expect(page.getByText('testuser logged in')).toBeVisible()
        const successMessage = await page.locator('#notification-message')
        await expect(successMessage).toHaveText('Login successful')
        const logoutButton = await page.locator('#logout-button')
        await expect(logoutButton).toBeVisible()
    })
    
    test('fails with wrong credentials', async({page}) => {
        await page.fill('#username','wronguser')
        await page.fill('#password','wrongpassword')
        await page.click('#login-button')
        const errorMessage = await page.locator('#notification-message')
        await expect(errorMessage).toHaveText('Wrong username or password')
        await expect(errorMessage).toHaveCSS('border-style', 'solid')
        await expect(errorMessage).toHaveCSS('border-radius', '5px')
        await expect(page.getByText('testuser logged in')).not.toBeVisible()
    })
})  

