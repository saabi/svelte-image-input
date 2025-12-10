<script lang='ts'>
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	let fileInput: HTMLInputElement = $state();

	const preventDefault = (event: Event) => {
		event.preventDefault();
	};

	/**
	 * Read the file and dispatch an event with the dataUrl
	 * @param file The file to read
	 */
	const readFile = (file: File) => {
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			if (!e.target) return;

			const dataUrl = e.target.result;
			dispatch("imageLoaded", { dataUrl });
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
