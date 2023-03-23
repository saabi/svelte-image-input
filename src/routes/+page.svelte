<script>
	import ImageInput from '$lib/components/ImageInput.svelte';

	let url = '';
</script>

<div class="container">
	<h1>Svelte Image Input and Manipulation Components</h1>

	<h2>ImageInput Example</h2>

	<p>
		Load an image using drag and drop, clipboard paste, or by clicking the
		"Load an image" button. Then, resize and crop the image. Click
		"Save Image" to display the data URL.
	</p>

	<div class='demo'>
		<div class='input'>
			<h3>Input Image</h3>
			<div class='imagebox'>
				<ImageInput bind:url />
			</div>
		</div>
		
		<div class='output'>
			<h3>Output Image</h3>
			<div class='imagebox'>
				{#if url}
					<img src={url} alt='sample output' />
				{/if}
			</div>		
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
	pre {
		width: 100%;
		overflow: auto;
	}
	a {
		color: var(--link-color);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
