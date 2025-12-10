<script module lang="ts">
	// ===== IMPORTS =====
	import ImageEncoder from './ImageEncoder.svelte';
	import ImageLoader from './ImageLoader.svelte';

	// ===== TYPES =====
	interface Props {
		/** A space-separated list of classes to apply to the canvas element. */
		classes?: string;
		/** Whether to allow cross-origin images. Defaults to false */
		crossOrigin?: boolean;
		/**  The source URL of the image to be displayed in the canvas. */
		src?: string;
		/** The width of the canvas. Defaults to 256 */
		width?: number;
		/** The height of the canvas. Defaults to 256 */
		height?: number;
		/** The image quality (0-1) for the JPEG output. Defaults to 0.5 */
		quality?: number;
		/** Whether to update the data URL in real time. Defaults to false */
		realTime?: boolean;
		/** The data URL of the modified image. Updated on pan and zoom actions. This is an output property, so you must use the `bind:` directive to bind it to a variable.*/
		url?: string;
		/** Whether to show the compressed result. Defaults to false */
		showCompressedResult?: boolean;
		/** Text displayed before the button in ImageLoader. Default: "Drop, paste, or" */
		prefixText?: string;
		/** Text displayed on the load button in ImageLoader. Default: "load an image" */
		buttonText?: string;
		/** 
		 * Scope for paste event handling in ImageLoader.
		 * - 'window': Listen for paste events anywhere on the page (default)
		 * - 'component': Only listen for paste events when component is focused
		 * @default 'window'
		 */
		pasteScope?: 'window' | 'component';
	}
</script>

<script lang="ts">
	// ===== PROPS =====
	let {
		classes = '',
		crossOrigin = false,
		src = $bindable(''),
		width = $bindable(),
		height = $bindable(),
		quality = 0.5,
		realTime = false,
		url = $bindable(''),
		showCompressedResult = false,
		prefixText,
		buttonText,
		pasteScope
	}: Props = $props();

	// ===== EFFECTS =====
	$effect(() => {
		width ??= 256;
	});
	$effect(() => {
		height ??= 256;
	});

	// ===== FUNCTIONS =====
	const clearImageURL = () => {
		src = '';
		url = '';
	};
</script>

<div class="ImageInput" style='--image-input-width: {width}px; --image-input-height: {height}px'>
	{#if src}
		<ImageEncoder
			{classes}
			{crossOrigin}
			{height}
			{realTime}
			{src}
			{showCompressedResult}
			{quality}
			{width}
			bind:url
		/>
		<button onclick={clearImageURL} aria-label="Clear image">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				style="display: block;"
			>
				<line x1="4" y1="4" x2="12" y2="12" />
				<line x1="12" y1="4" x2="4" y2="12" />
			</svg>
		</button>
	{:else}
		<ImageLoader
			onImageLoaded={(dataUrl) => (src = dataUrl)}
			{prefixText}
			{buttonText}
			{pasteScope}
		/>
	{/if}
</div>

<style>
	.ImageInput {
		/* Positioning */
		position: relative;
		
		/* Layout */
		box-sizing: content-box;
		display: grid;
		align-items: center;
		justify-items: center;
		width: var(--image-input-width);
		height: var(--image-input-height);
		
		/* Box/Visual */
		background: var(--image-input-background, transparent);
	}
	
	.ImageInput > button {
		/* Positioning */
		position: absolute;
		top: 0.25em;
		right: 0.25em;
		
		/* Layout */
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25em;
		line-height: 1;
		
		/* Box/Visual */
		border: none;
		border-color: var(--image-input-clear-button-border-color, transparent);
		border-radius: var(--image-input-clear-button-border-radius, 0);
		background-color: var(--image-input-clear-button-background, rgba(0, 0, 0, 0.1));
		
		/* Typography */
		color: var(--image-input-clear-button-color, inherit);
		
		/* Misc/Overrides */
		cursor: pointer;
	}
	
	.ImageInput > button svg {
		/* Layout */
		display: block;
		width: var(--image-input-clear-button-size, 1em);
		height: var(--image-input-clear-button-size, 1em);
		margin: 0;
		
		/* Box/Visual */
		stroke: currentColor;
	}
	
	.ImageInput > button:hover {
		/* Box/Visual */
		border-color: var(--image-input-clear-button-hover-border-color, transparent);
		background-color: var(--image-input-clear-button-hover-background, rgba(0, 0, 0, 0.2));
		
		/* Typography */
		color: var(--image-input-clear-button-hover-color, inherit);
	}
</style>
