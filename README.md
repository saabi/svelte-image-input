# Svelte Image Components

This repository contains three Svelte components for working with images:

1. `ImageInput`: A component that accepts images via drag and drop, clipboard paste, or by clicking a button to open a file dialog. It then allows you to resize and crop the image before creating a `data:` URL. It is a combination of the ImageLoader and ImageEncoder components described below.
2. `ImageLoader`: A component that allows you to load images via drag and drop, clipboard paste, or by clicking a button to open a file dialog.
3. `ImageEncoder`: A component for creating `data:` URLs from images in real time. You can also move and resize the image before encoding.

It supercedes the [svelte-image-encoder](https://github.com/saabi/svelte-image-encoder) component, which is now deprecated.

### Installation

```bash
npm install svelte-image-input
```

## `ImageInput` Component

This Svelte component combines the functionality of the `ImageEncoder` and `ImageLoader` components, providing an all-in-one solution for loading images, resizing, cropping, and creating `data:` URLs.

### Behavior

When an image is not loaded, the component displays the `ImageLoader` component, which allows you to load images via drag and drop, clipboard paste, or by clicking a button to open a file dialog.

Once an image is loaded, the component switches to display the `ImageEncoder` component, which allows you to move and resize the image before encoding it as a `data:` URL. A close button (`X`) appears in the top-right corner, allowing you to clear the image and return to the `ImageLoader` component.

### Demo

[https://saabi.github.io/svelte-image-input/](https://saabi.github.io/svelte-image-input/)

### Usage

```html
<script>
	import {ImageInput} from 'svelte-image-input';

	let url = '';
</script>

<ImageInput
	bind:url
	{src}
	{width}
	{height}
	{quality}
	{realTime}
	{crossOrigin}
	{classes}
	{showCompressedResult}
/>
```

### Props

- `src`: The source URL of the image to be displayed in the canvas. Defaults to an empty string.
- `url`: The data URL of the modified image. Updated on pan and zoom actions. This is an output property, so you must use the `bind:` directive to bind it to a variable.
- `width`: The width of the canvas. Defaults to 256.
- `height`: The height of the canvas. Defaults to 256.
- `quality`: The image quality (0-1) for the JPEG output. Defaults to 0.5.
- `realTime`: Whether to update the data URL in real time. Defaults to false.
- `crossOrigin`: Whether to allow cross-origin images. Defaults to false.
- `classes`: A space-separated list of classes to apply to the canvas element.
- `showCompressedResult`: Whether to show the compressed result. Defaults to false.

### Styles

The component comes with a basic style that you can customize or extend to match your application's design. The main element is a container with a fixed size, displaying either the `ImageLoader` or `ImageEncoder` component centered within it. The close button is positioned in the top-right corner when an image is loaded.

## `ImageLoader` Component
> Paste, drop or load images in Svelte

This Svelte component allows you to load images via drag and drop, clipboard paste, or by clicking a button to open a file dialog. It handles various input methods and dispatches an event with the loaded image's data URL.

### Usage

To use the component, add the `ImageLoader` component to your Svelte app and handle the `imageLoaded` event.

```html
<script>
	import {ImageLoader} from 'svelte-image-input';

	function handleImageLoaded(event) {
		const dataUrl = event.detail.dataUrl;
		console.log('Image loaded:', dataUrl);
	}
</script>

<ImageLoader on:imageLoaded={handleImageLoaded} />
```

### Event

- `imageLoaded`: Dispatched when an image is loaded. The event detail contains a `dataUrl` property with the loaded image's data URL.

## `ImageEncoder` Component
>Pan, Zoom, and Compress Images in Svelte

This Svelte component allows you to display an image in a canvas, apply pan and zoom actions to it, and create `data:` URLs from the images in real time. The generated data URL can be used for sending and receiving the image inside JSON AJAX requests and even storing images in database string columns, where an image URL would go, simplifying code logic. It provides a customizable user experience with various configuration options. The component also generates a data URL for the modified image, which can be used to show the compressed result. The original intended use is for a profile picture editor, allowing the user to resize and crop images, finally storing them in a small `data:` URL.

### Usage

```html
<script>
	import {ImageEncoder} from 'svelte-image-input';
</script>

<ImageEncoder
	src="{yourImageUrl}"
	url="{outputUrl}"
	quality={0.5}
	width={256}
	height={256}
	realTime={false}
	crossOrigin={false}
	classes="{yourCustomClass}"
	showCompressedResult={false}
/>
```

### Props

- `src: string`: The source URL of the image to be displayed in the canvas.
- `url: string`: The data URL of the modified image. Updated on pan and zoom actions. This is an output property, so you must use the `bind:` directive to bind it to a variable.
- `quality: number`: The image quality (0-1) for the JPEG output. Defaults to 0.5.
- `width: number`: The width of the canvas. Defaults to 256.
- `height: number`: The height of the canvas. Defaults to 256.
- `realTime: boolean`: Whether to update the data URL in real time. Defaults to false.
- `crossOrigin: boolean`: Whether to allow cross-origin images. Defaults to false.
- `classes: string`: A space-separated list of classes to apply to the canvas element.
- `showCompressedResult: boolean`: Whether to show the compressed result. Defaults to false.
