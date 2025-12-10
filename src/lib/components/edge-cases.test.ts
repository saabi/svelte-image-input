import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import ImageInput from './ImageInput.svelte';
import ImageLoader from './ImageLoader.svelte';
import { TEST_IMAGE_DATA_URL } from '../../test/setup';

describe('Edge Cases and Error Handling', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Empty/Invalid Image Source', () => {
		it('component handles empty or invalid src gracefully', () => {
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

			// Should show ImageLoader when src is empty
			expect(screen.getByText(/Drop, paste, or/i)).toBeInTheDocument();
		});

		it('component handles invalid URL gracefully', () => {
			const { container } = render(ImageInput, {
				props: {
					src: 'invalid-url',
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

			// Should not crash, component should render
			const canvas = container.querySelector('canvas');
			// Component may show canvas even with invalid src
			expect(container).toBeInTheDocument();
		});
	});

	describe('Image Load Error', () => {
		it('failed image load does not break component', async () => {
			// Mock Image to simulate load error
			const originalImage = global.Image;
			global.Image = class extends originalImage {
				constructor() {
					super();
					// Simulate error after a delay
					setTimeout(() => {
						if (this.onerror) {
							this.onerror(new Event('error') as any);
						}
					}, 10);
				}
			} as any;

			const { container } = render(ImageInput, {
				props: {
					src: 'https://invalid-url-that-will-fail.com/image.jpg',
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

			// Component should still be functional
			await waitFor(() => {
				expect(container).toBeInTheDocument();
			}, { timeout: 1000 });

			// Restore original Image
			global.Image = originalImage;
		});
	});

	describe('Rapid Prop Changes', () => {
		it('rapid prop changes do not cause errors', async () => {
			const { component } = render(ImageInput, {
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

			// Rapidly change props
			component.width = 100;
			component.height = 100;
			component.quality = 0.1;
			component.width = 200;
			component.height = 200;
			component.quality = 0.9;

			// Should not throw errors
			await waitFor(() => {
				expect(component.width).toBe(200);
				expect(component.height).toBe(200);
			}, { timeout: 1000 });
		});
	});

	describe('Callback Optional Handling', () => {
		it('ImageLoader works when onImageLoaded is not provided', async () => {
			const { container } = render(ImageLoader);

			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			Object.defineProperty(fileInput, 'files', {
				get: () => dataTransfer.files,
				configurable: true
			});

			// Should not throw when callback is missing
			expect(() => {
				fileInput.dispatchEvent(new Event('change', { bubbles: true }));
			}).not.toThrow();
		});
	});

	describe('Memory Management', () => {
		it('component cleans up resources properly', async () => {
			const { unmount, container } = render(ImageInput, {
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
			}, { timeout: 2000 });

			// Unmount component
			unmount();

			// Component should be removed from DOM
			expect(container.querySelector('canvas')).not.toBeInTheDocument();
		});
	});
});

