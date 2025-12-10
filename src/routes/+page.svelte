<script lang="ts">
	import ImageInput from '$lib/components/ImageInput.svelte';

	let url = $state('');
	let quality = $state(0.9);
	let theme = $state('default');
	let language = $state<'en' | 'es' | 'fr'>('en');
	let pasteScope = $state<'window' | 'component'>('window');

	const translations: Record<'en' | 'es' | 'fr', { prefix: string; button: string }> = {
		en: { prefix: 'Drop, paste, or', button: 'load an image' },
		es: { prefix: 'Arrastra, pega o', button: 'carga una imagen' },
		fr: { prefix: 'Glissez, collez ou', button: 'chargez une image' }
	};

	let currentText = $derived(translations[language]);
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

	<p>
		<strong>Paste Scope:</strong> When set to "Window" (default), paste works anywhere on the page.
		When set to "Component", paste only works when the component is focused (click on it first).
		Try switching between modes and pasting an image!
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

	<div class="controls">
		<label>
			<span>Theme: <a href="https://github.com/saabi/svelte-image-input/blob/main/docs/theming.md" target="_blank" rel="noopener noreferrer" class="doc-link" title="Theming documentation">📖</a></span>
			<select bind:value={theme}>
				<option value="default">Default</option>
				<option value="dark">Dark</option>
				<option value="brand">Brand</option>
				<option value="sophisticated">Sophisticated</option>
			</select>
		</label>

		<label>
			<span>Language: <a href="https://github.com/saabi/svelte-image-input/blob/main/docs/i18n.md" target="_blank" rel="noopener noreferrer" class="doc-link" title="Internationalization documentation">📖</a></span>
			<select bind:value={language}>
				<option value="en">English</option>
				<option value="es">Español</option>
				<option value="fr">Français</option>
			</select>
		</label>

		<label>
			<span>Paste Scope: <a href="https://github.com/saabi/svelte-image-input/blob/main/docs/paste-scope.md" target="_blank" rel="noopener noreferrer" class="doc-link" title="Paste scope documentation">📖</a></span>
			<select bind:value={pasteScope}>
				<option value="window">Window (default)</option>
				<option value="component">Component</option>
			</select>
		</label>
	</div>

	<div class='demo'>
		<div class='input'>
			<h3>Input Image</h3>
			<div class='imagebox theme-{theme}'>
				<ImageInput
					bind:url
					{quality}
					prefixText={currentText.prefix}
					buttonText={currentText.button}
					{pasteScope}
				/>
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

	<div class="documentation">
		<h2>Documentation</h2>
		<p>Learn more about the features demonstrated above:</p>
		<ul>
			<li><a href="https://github.com/saabi/svelte-image-input/blob/main/docs/theming.md" target="_blank" rel="noopener noreferrer">Theming Guide</a> - Customize component appearance with CSS variables</li>
			<li><a href="https://github.com/saabi/svelte-image-input/blob/main/docs/i18n.md" target="_blank" rel="noopener noreferrer">Internationalization (i18n)</a> - Customize text labels and support multiple languages</li>
			<li><a href="https://github.com/saabi/svelte-image-input/blob/main/docs/paste-scope.md" target="_blank" rel="noopener noreferrer">Paste Scope Control</a> - Control how paste events are handled</li>
		</ul>
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

	.controls {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
		flex-wrap: wrap;
		justify-content: center;
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

	.doc-link {
		font-size: 0.9em;
		margin-left: 0.25em;
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}
	.doc-link:hover {
		opacity: 1;
		text-decoration: none;
	}

	.documentation {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #e0e0e0;
		width: 100%;
	}
	.documentation ul {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
	}
	.documentation li {
		margin: 0.5rem 0;
		padding-left: 1.5rem;
		position: relative;
	}
	.documentation li::before {
		content: "→";
		position: absolute;
		left: 0;
		color: var(--primary-color);
	}

	/* Theme Styles */
	/* Default theme uses component defaults - no CSS overrides needed */

	.theme-dark {
		--image-loader-border-color: #666;
		--image-loader-background-color: #2a2a2a;
		--image-loader-text-color: #fff;
		--image-loader-hover-border-color: #888;
		--image-loader-hover-background-color: #333;
		--image-loader-button-color: #fff;
		--image-encoder-background-color: #1a1a1a;
		--image-input-clear-button-color: #fff;
		--image-input-clear-button-hover-background: rgba(255, 255, 255, 0.1);
		--image-input-clear-button-hover-border-color: rgba(255, 255, 255, 0.2);
	}

	.theme-brand {
		--image-loader-border-color: #4a7cf8;
		--image-loader-background-color: #f0f4ff;
		--image-loader-text-color: #333;
		--image-loader-hover-border-color: #2a5cd6;
		--image-loader-hover-background-color: #e0e8ff;
		--image-loader-button-color: #4a7cf8;
		--image-loader-button-hover-color: #2a5cd6;
		--image-input-clear-button-color: #fff;
		--image-input-clear-button-background: rgba(74, 124, 248, 0.8);
		--image-input-clear-button-border-color: #4a7cf8;
		--image-input-clear-button-border-radius: 50%;
		--image-input-clear-button-hover-background: rgba(74, 124, 248, 1);
		--image-input-clear-button-hover-border-color: #2a5cd6;
	}

	.theme-sophisticated {
		--image-loader-border-color: #e8e8e8;
		--image-loader-border-width: 1px;
		--image-loader-border-style: solid;
		--image-loader-border-radius: 12px;
		--image-loader-background-color: #fafafa;
		--image-loader-text-color: #5a5a5a;
		--image-loader-hover-border-color: #d0d0d0;
		--image-loader-hover-background-color: #f5f5f5;
		--image-loader-button-color: #fff;
		--image-loader-button-background: #6b7280;
		--image-loader-button-border-width: 0;
		--image-loader-button-border-radius: 24px;
		--image-loader-button-hover-color: #fff;
		--image-loader-button-hover-background: #4b5563;
		--image-encoder-background-color: #ffffff;
		--image-input-clear-button-color: #fff;
		--image-input-clear-button-background: rgba(107, 114, 128, 0.8);
		--image-input-clear-button-border-color: transparent;
		--image-input-clear-button-border-radius: 50%;
		--image-input-clear-button-hover-background: rgba(107, 114, 128, 1);
		--image-input-clear-button-hover-border-color: transparent;
	}
</style>
