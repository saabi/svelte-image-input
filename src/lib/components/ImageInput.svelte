<script lang="ts">
	import { run } from 'svelte/legacy';

	import ImageEncoder from './ImageEncoder.svelte';
	import ImageLoader from './ImageLoader.svelte';

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
	}

	let {
		classes = '',
		crossOrigin = false,
		src = $bindable(''),
		width = $bindable(256),
		height = $bindable(256),
		quality = 0.5,
		realTime = false,
		url = $bindable(''),
		showCompressedResult = false
	}: Props = $props();

	const clearImageURL = () => {
		src = '';
		url='';
	};
	
	run(() => {
		width ??= width ?? 256;
	});
	run(() => {
		height = height ?? 256;
	});
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
		<button onclick={clearImageURL}>X</button>
	{:else}
		<ImageLoader on:imageLoaded={({ detail: { dataUrl } }) => (src = dataUrl)} />
	{/if}
</div>

<style>
	.ImageInput {
		box-sizing: content-box;
		width: var(--image-input-width);
		height: var(--image-input-height);
		display: grid;
		align-items: center;
		justify-items: center;
		position: relative;
	}
	.ImageInput > button {
		position: absolute;
		top: 0.25em;
		right: 0.25em;
		cursor: pointer;
	}
</style>
