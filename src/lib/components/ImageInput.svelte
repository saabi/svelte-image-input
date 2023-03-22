<script lang='ts'>
	import ImageEncoder from "./ImageEncoder.svelte";
	import ImageLoader from "./ImageLoader.svelte";

	/** A space-separated list of classes to apply to the canvas element. */
	export let classes: string;
	/** Whether to allow cross-origin images. Defaults to false */
	export let crossOrigin: boolean;
	/**  The source URL of the image to be displayed in the canvas. */
	export let src = "";
	/** The width of the canvas. Defaults to 256 */
	export let width: number;
	/** The height of the canvas. Defaults to 256 */
	export let height: number;
	/** The image quality (0-1) for the JPEG output. Defaults to 0.5 */
	export let quality: number;
	/** Whether to update the data URL in real time. Defaults to false */
	export let realTime: boolean;
	/** The data URL of the modified image. Updated on pan and zoom actions. */
	export let url: string;
	/** Whether to show the compressed result. Defaults to false */
	export let showCompressedResult: boolean;

	const clearImageURL = () => {
		src = "";
	};

	$: width = width || 256;
	$: height = height || 256;
</script>

<div class='ImageInput'>
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
		<ImageLoader on:imageLoaded={({detail: {dataUrl}}) => src = dataUrl} />
	{/if}
</div>

<style>
	.ImageInput {
		width: 256px;
		height: 256px;
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
