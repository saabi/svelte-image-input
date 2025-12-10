import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/svelte';
import ImageEncoder from './ImageEncoder.svelte';
import { TEST_IMAGE_DATA_URL } from '../../test/setup';

describe('ImageEncoder Component', () => {
	let mockContext: CanvasRenderingContext2D;

	beforeEach(() => {
		// Mock Canvas Context
		mockContext = {
			resetTransform: vi.fn(),
			clearRect: vi.fn(),
			translate: vi.fn(),
			scale: vi.fn(),
			drawImage: vi.fn()
		} as unknown as CanvasRenderingContext2D;

		// Mock getContext to return our mock context
		HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext);
		HTMLCanvasElement.prototype.toDataURL = vi.fn(() => TEST_IMAGE_DATA_URL);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('Canvas Rendering', () => {
		it('canvas element is rendered with correct dimensions', () => {
			const { container } = render(ImageEncoder, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 300,
					height: 200,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: 'test-class',
					showCompressedResult: false
				}
			});

			const canvas = container.querySelector('canvas') as HTMLCanvasElement;
			expect(canvas).toBeInTheDocument();
			expect(canvas).toHaveAttribute('width', '300');
			expect(canvas).toHaveAttribute('height', '200');
			expect(canvas).toHaveClass('test-class');
		});
	});

	describe('Image Loading', () => {
		it('image loads and renders on canvas when src is provided', async () => {
			render(ImageEncoder, {
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

			// Wait for image to load (mocked Image constructor triggers onload automatically)
			await waitFor(() => {
				expect(mockContext.drawImage).toHaveBeenCalled();
			}, { timeout: 2000 });
		});
	});

	describe('Quality Prop', () => {
		it('quality prop affects output data URL', async () => {
			render(ImageEncoder, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 256,
					height: 256,
					quality: 0.1,
					realTime: false,
					crossOrigin: false,
					classes: '',
					showCompressedResult: false
				}
			});

			await waitFor(() => {
				expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.1);
			}, { timeout: 2000 });
		});
	});

	describe('Real-time Encoding', () => {
		it('URL updates in real-time when realTime=true', async () => {
			render(ImageEncoder, {
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

			await waitFor(() => {
				// With realTime=true, url should be updated during redraw
				expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalled();
			}, { timeout: 2000 });
		});
	});

	describe('Non-real-time Encoding', () => {
		it('URL updates when realTime=false', async () => {
			render(ImageEncoder, {
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
				// Initial encoding should happen
				expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalled();
			}, { timeout: 2000 });
		});
	});

	describe('Cross-Origin Handling', () => {
		it('crossOrigin prop sets image.crossOrigin correctly', async () => {
			const imageSpy = vi.spyOn(global, 'Image');
			render(ImageEncoder, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: true,
					classes: '',
					showCompressedResult: false
				}
			});

			await waitFor(() => {
				expect(imageSpy).toHaveBeenCalled();
				const createdImage = imageSpy.mock.results[0]?.value as HTMLImageElement;
				if (createdImage) {
					expect(createdImage.crossOrigin).toBe('anonymous');
				}
			}, { timeout: 2000 });
		});

		it('crossOrigin=false sets image.crossOrigin to null', async () => {
			const imageSpy = vi.spyOn(global, 'Image');
			render(ImageEncoder, {
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
				expect(imageSpy).toHaveBeenCalled();
				const createdImage = imageSpy.mock.results[0]?.value as HTMLImageElement;
				if (createdImage) {
					expect(createdImage.crossOrigin).toBeNull();
				}
			}, { timeout: 2000 });
		});
	});

	describe('Classes Prop', () => {
		it('classes prop is applied to canvas', () => {
			const { container } = render(ImageEncoder, {
				props: {
					src: TEST_IMAGE_DATA_URL,
					url: '',
					width: 256,
					height: 256,
					quality: 0.5,
					realTime: false,
					crossOrigin: false,
					classes: 'class1 class2 class3',
					showCompressedResult: false
				}
			});

			const canvas = container.querySelector('canvas');
			expect(canvas).toHaveClass('class1');
			expect(canvas).toHaveClass('class2');
			expect(canvas).toHaveClass('class3');
		});
	});

	describe('URL Output Format', () => {
		it('URL output is valid JPEG data URL', async () => {
			render(ImageEncoder, {
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
				expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.5);
			}, { timeout: 2000 });
		});
	});

	describe('Canvas Operations', () => {
		it('canvas context methods are called during redraw', async () => {
			render(ImageEncoder, {
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
				// After image loads, redraw should call canvas methods
				expect(mockContext.clearRect).toHaveBeenCalled();
				expect(mockContext.drawImage).toHaveBeenCalled();
			}, { timeout: 2000 });
		});
	});
});
