import '@testing-library/jest-dom';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import type { Assertion, AsymmetricMatchersContaining } from 'vitest';

declare module 'vitest' {
	interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
	interface AsymmetricMatchersContaining extends jest.Matchers<void, any> {}
}

