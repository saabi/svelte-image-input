# Svelte Image Components [demo](https://saabi.github.io/svelte-image-input/)

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

### Usage

```html
<script>
	import {ImageInput} from 'svelte-image-input';

	let url = '';
	let src = '';
</script>

<ImageInput
	bind:url
	{src}
	width={256}
	height={256}
	quality={0.5}
	realTime={false}
	crossOrigin={false}
	classes=""
	showCompressedResult={false}
	prefixText="Drop, paste, or"
	buttonText="load an image"
	pasteScope="window"
/>
```

### Props

#### ImageEncoder Props (passed through to ImageEncoder)

- `src?: string` - The source URL of the image to be displayed in the canvas. Defaults to an empty string.
- `url?: string` - The data URL of the modified image. Updated on pan and zoom actions. This is an output property, so you must use the `bind:` directive to bind it to a variable.
- `width?: number` - The width of the canvas. Defaults to `256`.
- `height?: number` - The height of the canvas. Defaults to `256`.
- `quality?: number` - The image quality (0-1) for the JPEG output. Defaults to `0.5`.
- `realTime?: boolean` - Whether to update the data URL in real time. Defaults to `false`.
- `crossOrigin?: boolean` - Whether to allow cross-origin images. Defaults to `false`.
- `classes?: string` - A space-separated list of classes to apply to the canvas element.
- `showCompressedResult?: boolean` - Whether to show the compressed result. Defaults to `false`.

#### ImageLoader Props (passed through to ImageLoader)

- `prefixText?: string` - Text displayed before the button in ImageLoader. Default: `"Drop, paste, or"`. See [i18n documentation](docs/i18n.md).
- `buttonText?: string` - Text displayed on the load button in ImageLoader. Default: `"load an image"`. See [i18n documentation](docs/i18n.md).
- `pasteScope?: 'window' | 'component'` - Control paste event scope. Default: `'window'`. See [paste scope documentation](docs/paste-scope.md).
  - `'window'`: Paste events anywhere on the page trigger image loading (default)
  - `'component'`: Paste events only work when the component is focused

## `ImageLoader` Component
> Paste, drop or load images in Svelte

This Svelte component allows you to load images via drag and drop, clipboard paste, or by clicking a button to open a file dialog. It handles various input methods and calls a callback with the loaded image's data URL.

### Usage

To use the component, add the `ImageLoader` component to your Svelte app and provide the `onImageLoaded` callback.

```html
<script>
	import {ImageLoader} from 'svelte-image-input';

	function handleImageLoaded(dataUrl) {
		console.log('Image loaded:', dataUrl);
	}
</script>

<ImageLoader
	onImageLoaded={handleImageLoaded}
	prefixText="Drop, paste, or"
	buttonText="load an image"
	pasteScope="window"
/>
```

### Props

- `onImageLoaded?: (dataUrl: string) => void` - Callback function called when an image is loaded. Receives the data URL as a string.
- `prefixText?: string` - Text displayed before the button. Default: `"Drop, paste, or"`. See [i18n documentation](docs/i18n.md).
- `buttonText?: string` - Text displayed on the load button. Default: `"load an image"`. See [i18n documentation](docs/i18n.md).
- `pasteScope?: 'window' | 'component'` - Control paste event scope. Default: `'window'`. See [paste scope documentation](docs/paste-scope.md).
  - `'window'`: Paste events anywhere on the page trigger image loading (default)
  - `'component'`: Paste events only work when the component is focused

## `ImageEncoder` Component
>Pan, Zoom, and Compress Images in Svelte

This Svelte component allows you to display an image in a canvas, apply pan and zoom actions to it, and create `data:` URLs from the images in real time. The generated data URL can be used for sending and receiving the image inside JSON AJAX requests and even storing images in database string columns, where an image URL would go, simplifying code logic. It provides a customizable user experience with various configuration options. The component also generates a data URL for the modified image, which can be used to show the compressed result. The original intended use is for a profile picture editor, allowing the user to resize and crop images, finally storing them in a small `data:` URL.

### Usage

```html
<script>
	import {ImageEncoder} from 'svelte-image-input';

	let outputUrl = '';
	let imageUrl = 'https://example.com/image.jpg';
</script>

<ImageEncoder
	bind:url={outputUrl}
	src={imageUrl}
	width={256}
	height={256}
	quality={0.5}
	realTime={false}
	crossOrigin={false}
	classes=""
	showCompressedResult={false}
/>
```

### Props

- `src: string` - **Required.** The source URL of the image to be displayed in the canvas.
- `url: string` - **Required.** The data URL of the modified image. Updated on pan and zoom actions. This is an output property, so you must use the `bind:` directive to bind it to a variable.
- `quality: number` - The image quality (0-1) for the JPEG output. Defaults to `0.5`.
- `width: number` - The width of the canvas. Defaults to `256`.
- `height: number` - The height of the canvas. Defaults to `256`.
- `realTime: boolean` - Whether to update the data URL in real time. Defaults to `false`.
- `crossOrigin: boolean` - Whether to allow cross-origin images. Defaults to `false`.
- `classes: string` - A space-separated list of classes to apply to the canvas element.
- `showCompressedResult: boolean` - Whether to show the compressed result. Defaults to `false`.

## Documentation

For advanced usage and customization options, see the following documentation:

- **[Theming Guide](docs/theming.md)** - Customize component appearance with CSS variables
- **[Internationalization (i18n)](docs/i18n.md)** - Support multiple languages and customize text
- **[Paste Event Scope](docs/paste-scope.md)** - Control how paste events are handled
