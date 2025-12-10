<script lang='ts'>
	import { run } from 'svelte/legacy';

	import type { Transform } from '../utils/pan-zoom.js';

	import { panHandler } from '../utils/pan-zoom.js';
	import { onMount } from 'svelte';

	
	
	
	
	
	
	
	
	
	interface Props {
		/**  The source URL of the image to be displayed in the canvas. */
		src: string;
		/** The data URL of the modified image. Updated on pan and zoom actions. This is an output property, so you must use the `bind:` directive to bind it to a variable.*/
		url: string;
		/** The image quality (0-1) for the JPEG output. Defaults to 0.5 */
		quality: number;
		/** The width of the canvas. Defaults to 256 */
		width: number;
		/** The height of the canvas. Defaults to 256 */
		height: number;
		/** Whether to update the data URL in real time. Defaults to false */
		realTime: boolean;
		/** Whether to allow cross-origin images. Defaults to false */
		crossOrigin: boolean;
		/** A space-separated list of classes to apply to the canvas element. */
		classes: string;
		/** Whether to show the compressed result. Defaults to false */
		showCompressedResult: boolean;
	}

	let {
		src = $bindable(),
		url = $bindable(),
		quality = $bindable(),
		width = $bindable(),
		height = $bindable(),
		realTime = $bindable(),
		crossOrigin = $bindable(),
		classes = $bindable(),
		showCompressedResult = $bindable()
	}: Props = $props();

	run(() => {
		src = src || '';
	});
	run(() => {
		url = url || '';
	});
	run(() => {
		width = width || 256;
	});
	run(() => {
		height = height || 256;
	});
	run(() => {
		quality = quality || 0.5;
	});
	run(() => {
		realTime = realTime || false;
	});
	run(() => {
		crossOrigin = crossOrigin || false;
	});
	run(() => {
		classes = classes || '';
	});
	run(() => {
		showCompressedResult = showCompressedResult || false;
	});

	let canvas: HTMLCanvasElement = $state();
	let img: HTMLImageElement | undefined = $state();
	let ctx: CanvasRenderingContext2D | null;

	let offsetX = $state(0);
	let offsetY = $state(0);
	let scale = $state(1);
	let minScale = 1;
	let dragging = false;

	// not a POJO because getters/setters are instrumentable by Svelte
	// and `transform` is updated by imported functions
	let transform: Transform = {
		getMinScale () {
			// read only, TODO: maxScale
			return minScale;
		},
		getScale () {
			return scale;
		},
		setScale (s) {
			scale = s;
		},
		getOffsetX () {
			return offsetX;
		},
		getOffsetY () {
			return offsetY;
		},
		setOffsetX (ox) {
			offsetX = ox;
		},
		setOffsetY (oy) {
			offsetY = oy;
		},
		setDragging (d) {
			if (!realTime && d === false) url = canvas.toDataURL('image/jpeg', quality);
			dragging = d;
		},
		getDragging () {
			return dragging;
		}
	};

	function redraw () {
		if (!img || !ctx) return;
		if (offsetX < 0) offsetX = 0;
		if (offsetY < 0) offsetY = 0;
		let limit = img.width * scale - width;
		if (offsetX > limit) offsetX = limit;
		limit = img.height * scale - height;
		if (offsetY > limit) offsetY = limit;

		ctx.resetTransform();
		ctx.clearRect(0, 0, width, height);
		ctx.translate(-offsetX, -offsetY);
		ctx.scale(scale, scale);
		ctx.drawImage(img, 0, 0);

		if (realTime || !dragging) url = canvas.toDataURL('image/jpeg', quality);
	}

	run(() => {
		img && (img.crossOrigin = crossOrigin ? 'anonymous' : null);
	});
	run(() => {
		img && (img.src = src);
	});
	run(() => {
		quality, width, height, offsetX, offsetY, scale, redraw();
	});

	onMount(() => {
		ctx = canvas.getContext('2d');
		img = new Image();
		img.onload = function () {
			offsetX = 0;
			offsetY = 0;
			scale = minScale = Math.max(width / img!.width, height / img!.height);
		};
	});
</script>

<canvas bind:this={canvas} {width} {height} class={classes} use:panHandler={transform}></canvas>

<style>
	canvas {
		touch-action: none;
		position: relative;
		cursor: move;
	}
</style>
