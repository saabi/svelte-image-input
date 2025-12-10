import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import ImageLoader from './ImageLoader.svelte';
import { createMockImageFile, createMockDataTransferItem, TEST_IMAGE_DATA_URL } from '../../test/setup';

describe('ImageLoader Component', () => {
	describe('Rendering Tests', () => {
		it('renders drop area with correct text and button', () => {
			const { container } = render(ImageLoader, {
				props: {
					prefixText: 'Drop, paste, or',
					buttonText: 'load an image'
				}
			});

			expect(screen.getByText('Drop, paste, or')).toBeInTheDocument();
			expect(screen.getByText('load an image')).toBeInTheDocument();
			
			// Check for hidden file input
			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			expect(fileInput).toBeInTheDocument();
			expect(fileInput).toHaveAttribute('accept', 'image/*');
		});
	});

	describe('File Input Click Handler', () => {
		it('clicking button triggers file input', () => {
			const { container } = render(ImageLoader);
			const button = screen.getByText('load an image');
			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			
			const clickSpy = vi.spyOn(fileInput, 'click');
			
			fireEvent.click(button);
			
			expect(clickSpy).toHaveBeenCalled();
		});
	});

	describe('File Selection via Input', () => {
		it('selecting file via input triggers callback with data URL', async () => {
			const onImageLoaded = vi.fn();
			const { container } = render(ImageLoader, {
				props: { onImageLoaded }
			});

			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			const file = createMockImageFile();

			// Create a FileList with the file
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			Object.defineProperty(fileInput, 'files', {
				get: () => dataTransfer.files,
				configurable: true
			});

			fireEvent.change(fileInput);

			await waitFor(() => {
				expect(onImageLoaded).toHaveBeenCalled();
				expect(onImageLoaded).toHaveBeenCalledWith(expect.stringMatching(/^data:image\//));
			});
		});
	});

	describe('Drag and Drop - Valid Image', () => {
		it('dropping valid image file triggers callback', async () => {
			const onImageLoaded = vi.fn();
			const { container } = render(ImageLoader, {
				props: { onImageLoaded }
			});

			const dropArea = container.querySelector('.drop-area') as HTMLElement;
			const file = createMockImageFile();

			const dragOverEvent = new DragEvent('dragover', {
				bubbles: true,
				cancelable: true
			});
			Object.defineProperty(dragOverEvent, 'dataTransfer', {
				value: {
					items: [createMockDataTransferItem(file)]
				}
			});

			fireEvent(dropArea, dragOverEvent);
			expect(dragOverEvent.defaultPrevented).toBe(true);

			const dropEvent = new DragEvent('drop', {
				bubbles: true,
				cancelable: true
			});
			Object.defineProperty(dropEvent, 'dataTransfer', {
				value: {
					items: [createMockDataTransferItem(file)]
				}
			});

			fireEvent(dropArea, dropEvent);

			await waitFor(() => {
				expect(onImageLoaded).toHaveBeenCalled();
				expect(onImageLoaded).toHaveBeenCalledWith(expect.stringMatching(/^data:image\//));
			});
		});
	});

	describe('Drag and Drop - Invalid File Type', () => {
		it('dropping non-image file does not trigger callback', async () => {
			const onImageLoaded = vi.fn();
			const { container } = render(ImageLoader, {
				props: { onImageLoaded }
			});

			const dropArea = container.querySelector('.drop-area') as HTMLElement;
			const textFile = new File(['text content'], 'test.txt', { type: 'text/plain' });

			const dropEvent = new DragEvent('drop', {
				bubbles: true,
				cancelable: true
			});
			Object.defineProperty(dropEvent, 'dataTransfer', {
				value: {
					items: [{
						kind: 'file',
						type: 'text/plain',
						getAsFile: () => textFile
					} as DataTransferItem]
				}
			});

			fireEvent(dropArea, dropEvent);

			// Wait a bit to ensure callback is not called
			await new Promise(resolve => setTimeout(resolve, 100));
			expect(onImageLoaded).not.toHaveBeenCalled();
		});
	});

	describe('Paste Handler - Valid Image', () => {
		it('pasting image from clipboard triggers callback', async () => {
			const onImageLoaded = vi.fn();
			render(ImageLoader, {
				props: { onImageLoaded }
			});

			const file = createMockImageFile();
			const pasteEvent = new ClipboardEvent('paste', {
				bubbles: true,
				cancelable: true
			});
			Object.defineProperty(pasteEvent, 'clipboardData', {
				value: {
					items: [createMockDataTransferItem(file)]
				}
			});

			fireEvent(window, pasteEvent);

			await waitFor(() => {
				expect(onImageLoaded).toHaveBeenCalled();
				expect(onImageLoaded).toHaveBeenCalledWith(expect.stringMatching(/^data:image\//));
			});
		});
	});

	describe('Paste Handler - No Image Data', () => {
		it('pasting non-image data does not trigger callback', async () => {
			const onImageLoaded = vi.fn();
			render(ImageLoader, {
				props: { onImageLoaded }
			});

			const pasteEvent = new ClipboardEvent('paste', {
				bubbles: true,
				cancelable: true
			});
			Object.defineProperty(pasteEvent, 'clipboardData', {
				value: {
					items: [{
						kind: 'string',
						type: 'text/plain',
						getAsFile: () => null
					} as DataTransferItem]
				}
			});

			fireEvent(window, pasteEvent);

			await new Promise(resolve => setTimeout(resolve, 100));
			expect(onImageLoaded).not.toHaveBeenCalled();
		});
	});

	describe('Callback Optional Handling', () => {
		it('component works when onImageLoaded is not provided', async () => {
			const { container } = render(ImageLoader);

			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			const file = createMockImageFile();

			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			Object.defineProperty(fileInput, 'files', {
				get: () => dataTransfer.files,
				configurable: true
			});

			// Should not throw
			expect(() => {
				fireEvent.change(fileInput);
			}).not.toThrow();
		});
	});

	describe('Multiple File Selection', () => {
		it('only first file is processed when multiple files selected', async () => {
			const onImageLoaded = vi.fn();
			const { container } = render(ImageLoader, {
				props: { onImageLoaded }
			});

			const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
			const file1 = createMockImageFile('image1.jpg');
			const file2 = createMockImageFile('image2.jpg');

			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file1);
			dataTransfer.items.add(file2);
			Object.defineProperty(fileInput, 'files', {
				get: () => dataTransfer.files,
				configurable: true
			});

			fireEvent.change(fileInput);

			await waitFor(() => {
				expect(onImageLoaded).toHaveBeenCalledTimes(1);
			});
		});
	});
});

