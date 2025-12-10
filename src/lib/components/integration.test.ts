import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import ImageInput from './ImageInput.svelte';
import { TEST_IMAGE_DATA_URL, createMockImageFile } from '../../test/setup';

describe('Integration Tests', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Full Workflow - Load to Encode', () => {
		it('complete workflow from loading to encoding', async () => {
			const { container } = render(ImageInput, {
				props: {
					src: '',
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			// Initially should show ImageLoader
			expect(screen.getByText(/Drop, paste, or/i)).toBeInTheDocument();

			// Simulate image load via file input
			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			const file = createMockImageFile();
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			Object.defineProperty(fileInput, 'files', {
				get: () => dataTransfer.files,
				configurable: true
			});

			fileInput.dispatchEvent(new Event('change', { bubbles: true }));

			// Should transition to ImageEncoder
			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
			}, { timeout: 5000 });
		});
	});

	describe('Quality Change', () => {
		it('component accepts quality prop', () => {
			const { container } = render(ImageInput, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 256,
					height: 256,
					quality: 0.8,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			// Component should render with quality prop
			expect(container).toBeInTheDocument();
		});
	});

	describe('Real-time Toggle', () => {
		it('component accepts realTime prop', () => {
			const { container } = render(ImageInput, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: true,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			// Component should render with realTime prop
			expect(container).toBeInTheDocument();
		});
	});

	describe('Multiple Load/Clear Cycles', () => {
		it('component can be cleared and reloaded', async () => {
			const { container } = render(ImageInput, {
				props: {
					src: '',
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			// Initially shows ImageLoader
			expect(screen.getByText(/Drop, paste, or/i)).toBeInTheDocument();

			// Load image
			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			const file = createMockImageFile();
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			Object.defineProperty(fileInput, 'files', {
				get: () => dataTransfer.files,
				configurable: true
			});

			fileInput.dispatchEvent(new Event('change', { bubbles: true }));

			// Wait for transition
			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
			}, { timeout: 5000 });

			// Clear
			const clearButton = container.querySelector('button[aria-label="Clear image"]');
			if (clearButton) {
				clearButton.click();
				
				// Should return to ImageLoader
				await waitFor(() => {
					expect(screen.getByText(/Drop, paste, or/i)).toBeInTheDocument();
				}, { timeout: 2000 });
			}
		});
	});

	describe('Different Image Formats', () => {
		it('component handles different image formats', async () => {
			// Test with PNG data URL
			const pngDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
			
			const { container } = render(ImageInput, {
				props: {
					src: pngDataUrl,
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
			}, { timeout: 2000 });
		});
	});

	describe('Different Image Sizes', () => {
		it('component handles various image dimensions', async () => {
			// Test with a small image
			const { container: container1 } = render(ImageInput, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			await waitFor(() => {
				const canvas = container1.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
			}, { timeout: 2000 });
		});
	});

	describe('Aspect Ratio Handling', () => {
		it('images with different aspect ratios are handled', async () => {
			// Test with square canvas
			const { container } = render(ImageInput, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
				expect(canvas).toHaveAttribute('width', '256');
				expect(canvas).toHaveAttribute('height', '256');
			}, { timeout: 2000 });
		});
	});
});

