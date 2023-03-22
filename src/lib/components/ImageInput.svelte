<script lang='ts'>
	import ImageEncoder from "./ImageEncoder.svelte";
	import ImageLoader from "./ImageLoader.svelte";

	export let classes: string;
	export let crossOrigin: boolean;
	export let src = "";
	export let width: number;
	export let height: number;
	export let quality: number;
	export let realTime: boolean;
	export let url: string;
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
