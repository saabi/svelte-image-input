import { expect, test } from '@playwright/test';

test('demo page loads correctly', async ({ page }) => {
	await page.goto('/');
	
	// Check main heading
	await expect(page.getByRole('heading', { name: 'Svelte Image Input and Manipulation Components' })).toBeVisible();
	
	// Check ImageInput example section
	await expect(page.getByRole('heading', { name: 'ImageInput Example' })).toBeVisible();
	
	// Check that ImageLoader is visible (drop area)
	await expect(page.getByText(/Drop, paste, or/i)).toBeVisible();
	await expect(page.getByText(/load an image/i)).toBeVisible();
});

test('theme selector works', async ({ page }) => {
	await page.goto('/');
	
	// Find theme selector
	const themeSelect = page.getByLabel('Theme:');
	await expect(themeSelect).toBeVisible();
	
	// Change theme
	await themeSelect.selectOption('dark');
	await expect(themeSelect).toHaveValue('dark');
	
	await themeSelect.selectOption('brand');
	await expect(themeSelect).toHaveValue('brand');
});

test('language selector works', async ({ page }) => {
	await page.goto('/');
	
	// Find language selector
	const languageSelect = page.getByLabel('Language:');
	await expect(languageSelect).toBeVisible();
	
	// Change language
	await languageSelect.selectOption('es');
	await expect(languageSelect).toHaveValue('es');
	
	// Check that text changed
	await expect(page.getByText(/Arrastra, pega o/i)).toBeVisible();
});

test('paste scope selector works', async ({ page }) => {
	await page.goto('/');
	
	// Find paste scope selector
	const pasteScopeSelect = page.getByLabel('Paste Scope:');
	await expect(pasteScopeSelect).toBeVisible();
	
	// Change paste scope
	await pasteScopeSelect.selectOption('component');
	await expect(pasteScopeSelect).toHaveValue('component');
});

test('documentation links are present', async ({ page }) => {
	await page.goto('/');
	
	// Check documentation section
	await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
	
	// Check documentation links
	await expect(page.getByRole('link', { name: /Theming Guide/i })).toBeVisible();
	await expect(page.getByRole('link', { name: /Internationalization/i })).toBeVisible();
	await expect(page.getByRole('link', { name: /Paste Scope Control/i })).toBeVisible();
});
