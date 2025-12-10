<script module lang="ts">
	// ===== TYPES =====
	interface Props {
		/** Callback function called when an image is loaded. Receives the data URL as a string. */
		onImageLoaded?: (dataUrl: string) => void;
		/** Text displayed before the button. Default: "Drop, paste, or" */
		prefixText?: string;
		/** Text displayed on the load button. Default: "load an image" */
		buttonText?: string;
	}
</script>

<script lang="ts">
	// ===== PROPS =====
	let {
		onImageLoaded,
		prefixText = 'Drop, paste, or',
		buttonText = 'load an image'
	}: Props = $props();

	// ===== REFS =====
	let fileInput: HTMLInputElement = $state();

	// ===== FUNCTIONS =====
	const preventDefault = (event: Event) => {
		event.preventDefault();
	};

	/**
	 * Read the file and call the onImageLoaded callback with the dataUrl
	 * @param file The file to read
	 */
	const readFile = (file: File) => {
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			if (!e.target) return;

			const dataUrl = e.target.result as string;
			onImageLoaded?.(dataUrl);
		};
		reader.readAsDataURL(file);
	};

	const handleFileChange = (event: Event) => {
		const file = (event.target as HTMLInputElement | null)?.files?.[0];
		if (!file) return;

		readFile(file);
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		const items = event.dataTransfer?.items;
		if (!items) return;

		const imageItem = Array.from(items).find(item => 
			item.kind === "file" && item.type.startsWith("image/")
		);
		if (!imageItem) return;

		const file = imageItem.getAsFile();
		if (!file) return;

		readFile(file);
	};

	const handlePaste = async (event: ClipboardEvent) => {
		const items = event.clipboardData?.items;
		if (!items) return;

		const imageItem = Array.from(items).find(item =>
			item.type.indexOf("image") === 0
		);
		if (!imageItem) return;

		event.preventDefault();
		const file = imageItem.getAsFile();
		if (!file) return;

		readFile(file);
	};

	const handleButtonClick = () => {
		fileInput.click();
	};
</script>

<svelte:window onpaste={handlePaste} />

<div
	class="drop-area"
	ondrop={handleDrop}
	ondragover={preventDefault}
	ondragenter={preventDefault}
	ondragleave={preventDefault}
>
	{prefixText}
	<button onclick={handleButtonClick}>{buttonText}</button>
</div>
<input
	type="file"
	accept="image/*"
	bind:this={fileInput}
	class="hidden"
	onchange={handleFileChange}
/>

<style>
	.drop-area {
		/* Layout */
		box-sizing: border-box;
		display: grid;
		align-items: center;
		align-content: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		text-align: center;
		vertical-align: center;
		
		/* Box/Visual */
		border: var(--image-loader-border-width, 2px) 
		        var(--image-loader-border-style, dashed) 
		        var(--image-loader-border-color, #ccc);
		border-radius: var(--image-loader-border-radius, 0);
		background-color: var(--image-loader-background-color, #f9f9f9);
		color: var(--image-loader-text-color, inherit);
	}
	
	.drop-area:hover {
		border-color: var(--image-loader-hover-border-color, #999);
		background-color: var(--image-loader-hover-background-color, #f0f0f0);
	}
	
	button {
		/* Misc/Overrides */
		cursor: pointer;
		color: var(--image-loader-button-color, inherit);
		background: var(--image-loader-button-background, transparent);
		border-radius: var(--image-loader-button-border-radius, revert);
		padding: 0.5em 1em;
		transition: background-color 0.2s ease, color 0.2s ease;
		/* Border: use browser default unless explicitly overridden */
		border-width: var(--image-loader-button-border-width, revert);
		border-style: var(--image-loader-button-border-style, revert);
		border-color: var(--image-loader-button-border-color, revert);
	}
	
	button:hover {
		color: var(--image-loader-button-hover-color, inherit);
		background: var(--image-loader-button-hover-background, transparent);
		border-color: var(--image-loader-button-hover-border-color, revert);
	}
	
	.hidden {
		/* Layout */
		display: none;
	}
</style>
