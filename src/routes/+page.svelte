<script>
	import ImageInput from '$lib/components/ImageInput.svelte';

	let url = $state('');
	let quality = $state(0.9);
</script>

<div class="container">
	<h1>Svelte Image Input and Manipulation Components</h1>

	<h2>ImageInput Example</h2>

	<p>
		Load an image using drag and drop, clipboard paste, or by clicking the
		"Load an image" button. Then, resize and crop the image. The output
		image will be displayed beside along with the final size in bytes of the
		data URL.
	</p>

	<label>
		<span>Quality ({Math.round(quality * 100)}%): </span>
		<input
			type="range"
			min="0.1"
			max="1"
			step="0.1"
			bind:value={quality}
		/>
	</label>

	<div class='demo'>
		<div class='input'>
			<h3>Input Image</h3>
			<div class='imagebox'>
				<ImageInput bind:url {quality} />
			</div>
		</div>
		
		<div class='output'>
			<h3>Output Image</h3>
			<div class='imagebox'>
				{#if url}
					<img src={url} alt='sample output' />
				{/if}
			</div>
			{#if url}
				<p>data url size: {url.length} bytes</p>
			{/if}
		</div>
	</div>

	<p>
		Check out the code on <a href="https://github.com/saabi/svelte-image-input" target="_blank" rel="noopener noreferrer">GitHub</a>.
	</p>
</div>

<style>
	.container {
		--primary-color: #4a7cf8;
		--text-color: #333;
		--link-color: #0366d6;
	}

	:global(body) {
		background-color: #f3f3f3;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: sans-serif;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}

	h1, h2, h3, p {
		color: var(--text-color);
	}

	h2, h3 {
		color: var(--primary-color);
	}

	.demo {
		display: grid;
		grid-auto-flow: column;
		grid-gap: 1rem;
		align-items: start;
		margin-top: 1rem;
	}
	.imagebox {
		width: 256px;
		height: 256px;
		box-sizing: border-box;
		box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
		border-radius: 4px;
		overflow: hidden;
	}
	a {
		color: var(--link-color);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
