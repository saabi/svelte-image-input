import { afterEach, vi, expect } from 'vitest';
import { cleanup } from '@testing-library/svelte';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
	cleanup();
});

// Mock FileReader
global.FileReader = class FileReader extends EventTarget {
	result: string | ArrayBuffer | null = null;
	onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
	onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;
	readyState: number = 0;

	readAsDataURL(file: File | Blob) {
		// Simulate async read
		setTimeout(() => {
			this.result = `data:image/jpeg;base64,/9j/4AAQSkZJRg==`;
			this.readyState = 2; // DONE
			if (this.onload) {
				const event = new Event('load') as unknown as ProgressEvent<FileReader>;
				Object.defineProperty(event, 'target', { value: this, writable: false });
				this.onload(event);
			}
		}, 0);
	}

	readAsArrayBuffer(file: File | Blob) {
		// Not used in our components
	}

	readAsText(file: File | Blob) {
		// Not used in our components
	}

	abort() {
		// Not used in our components
	}
} as any;

// Mock canvas toDataURL
HTMLCanvasElement.prototype.toDataURL = vi.fn((type?: string, quality?: number) => {
	return `data:image/jpeg;base64,/9j/4AAQSkZJRg==`;
});

// Mock Image constructor
global.Image = class Image extends EventTarget {
	width = 0;
	height = 0;
	src = '';
	crossOrigin: string | null = null;
	onload: ((this: HTMLImageElement, ev: Event) => any) | null = null;
	onerror: ((this: HTMLImageElement, ev: Event | string) => any) | null = null;

	constructor() {
		super();
		// Simulate async image load
		setTimeout(() => {
			if (this.onload) {
				this.width = 100;
				this.height = 100;
				this.onload.call(this, new Event('load'));
			}
		}, 0);
	}
} as any;

// Create a test image data URL (1x1 red pixel PNG)
export const TEST_IMAGE_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Helper to create a mock File object
export function createMockImageFile(name = 'test-image.jpg'): File {
	const blob = new Blob(['fake image data'], { type: 'image/jpeg' });
	return new File([blob], name, { type: 'image/jpeg' });
}

// Helper to create a mock DataTransferItem
export function createMockDataTransferItem(file: File): DataTransferItem {
	return {
		kind: 'file',
		type: file.type,
		getAsFile: () => file,
		getAsString: () => null,
		webkitGetAsEntry: () => null
	} as unknown as DataTransferItem;
}

