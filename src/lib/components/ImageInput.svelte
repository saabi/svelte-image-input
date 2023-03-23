<script lang="ts">
	import ImageEncoder from './ImageEncoder.svelte';
	import ImageLoader from './ImageLoader.svelte';

	/** A space-separated list of classes to apply to the canvas element. */
	export let classes = '';
	/** Whether to allow cross-origin images. Defaults to false */
	export let crossOrigin = false;
	/**  The source URL of the image to be displayed in the canvas. */
	export let src = '';
	/** The width of the canvas. Defaults to 256 */
	export let width = 256;
	/** The height of the canvas. Defaults to 256 */
	export let height = 256;
	/** The image quality (0-1) for the JPEG output. Defaults to 0.5 */
	export let quality = 0.5;
	/** Whether to update the data URL in real time. Defaults to false */
	export let realTime = false;
	/** The data URL of the modified image. Updated on pan and zoom actions. This is an output property, so you must use the `bind:` directive to bind it to a variable.*/
	export let url = '';
	/** Whether to show the compressed result. Defaults to false */
	export let showCompressedResult = false;

	const clearImageURL = () => {
		src = '';
		url='';
	};
	
	$: width = width ?? 256;
	$: height = height ?? 256;
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
		<button on:click={clearImageURL}>X</button>
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
