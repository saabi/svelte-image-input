import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import ImageInput from './ImageInput.svelte';
import { TEST_IMAGE_DATA_URL, createMockImageFile } from '../../test/setup';

describe('ImageInput Component', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('Initial State - No Image', () => {
		it('shows ImageLoader when src is empty', () => {
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

			// Should show ImageLoader (drop area with button)
			expect(screen.getByText(/Drop, paste, or/i)).toBeInTheDocument();
			expect(screen.getByText(/load an image/i)).toBeInTheDocument();
		});
	});

	describe('State Transition - Image Loaded', () => {
		it('shows ImageEncoder when src is set', async () => {
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

			// Should show canvas (ImageEncoder)
			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
			}, { timeout: 2000 });
		});
	});

	describe('Clear Button', () => {
		it('clear button resets src and url', async () => {
			let srcValue = TEST_IMAGE_DATA_URL;
			let urlValue = '';
			
			const { component, container } = render(ImageInput, {
				props: {
					src: srcValue,
					url: urlValue,
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			// Wait for ImageEncoder to render
			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
			}, { timeout: 2000 });

			// Find and click clear button
			const clearButton = container.querySelector('button[aria-label="Clear image"]');
			expect(clearButton).toBeInTheDocument();
			
			if (clearButton) {
				clearButton.click();
				
				// After clearing, should show ImageLoader again
				await waitFor(() => {
					expect(screen.getByText(/Drop, paste, or/i)).toBeInTheDocument();
				}, { timeout: 1000 });
			}
		});
	});

	describe('Props Forwarding', () => {
		it('props are correctly forwarded to child components', async () => {
			const { container } = render(ImageInput, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 300,
					height: 200,
					quality: 0.8,
					realTime: true,
					crossOrigin: true,
					classes: 'custom-class',
					showCompressedResult: false
				}
			});

			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
				expect(canvas).toHaveAttribute('width', '300');
				expect(canvas).toHaveAttribute('height', '200');
				expect(canvas).toHaveClass('custom-class');
			}, { timeout: 2000 });
		});
	});

	describe('ImageLoader Callback Integration', () => {
		it('ImageLoader callback updates src', async () => {
			let srcValue = '';
			const { container } = render(ImageInput, {
				props: {
					src: srcValue,
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

			// Simulate image load via file input
			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			expect(fileInput).toBeInTheDocument();

			const file = createMockImageFile();
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			Object.defineProperty(fileInput, 'files', {
				get: () => dataTransfer.files,
				configurable: true
			});

			// Trigger file change
			const changeEvent = new Event('change', { bubbles: true });
			fileInput.dispatchEvent(changeEvent);

			// Should transition to ImageEncoder after image loads
			await waitFor(() => {
				const canvas = container.querySelector('canvas');
				expect(canvas).toBeInTheDocument();
			}, { timeout: 3000 });
		});
	});

	describe('i18n Props', () => {
		it('prefixText and buttonText are passed to ImageLoader', () => {
			render(ImageInput, {
				props: {
					src: '',
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false,
					prefixText: 'Custom prefix',
					buttonText: 'Custom button'
				}
			});

			expect(screen.getByText('Custom prefix')).toBeInTheDocument();
			expect(screen.getByText('Custom button')).toBeInTheDocument();
		});
	});

	describe('Paste Scope Prop', () => {
		it('pasteScope prop is passed to ImageLoader', () => {
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
					showCompressedResult: false,
					pasteScope: 'component'
				}
			});

			// When pasteScope is 'component', drop area should have tabindex
			const dropArea = container.querySelector('.drop-area');
			expect(dropArea).toBeInTheDocument();
			expect(dropArea).toHaveAttribute('tabindex', '0');
		});
	});
});

