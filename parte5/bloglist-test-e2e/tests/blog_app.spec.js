const { describe, test, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async({page}) => {
        await page.goto('http://localhost:5173')
    })
    test('Login form is shown', async ({page}) => {
        const loginForm = await page.locator('form')
        await expect(loginForm).toBeVisible()
    })
})  

