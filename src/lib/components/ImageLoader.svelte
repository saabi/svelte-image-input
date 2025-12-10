<script lang='ts'>
	interface Props {
		/** Callback function called when an image is loaded. Receives the data URL as a string. */
		onImageLoaded?: (dataUrl: string) => void;
	}

	let { onImageLoaded }: Props = $props();

	let fileInput: HTMLInputElement = $state();

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
	Drop, paste, or
	<button onclick={handleButtonClick}>load an image</button>
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
		box-sizing: border-box;
		display: inline-block;
		border: 2px dashed #ccc;
		background-color: #f9f9f9;
		width: 100%;
		height: 100%;
		text-align: center;
		vertical-align: center;
		display: grid;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
	button {
		cursor: pointer;		
	}
	.hidden {
		display: none;
	}
</style>
