<script lang='ts'>
	import type { Transform } from '../utils/pan-zoom.js';

	import { panHandler } from '../utils/pan-zoom.js';
	import { onMount } from 'svelte';

	/**  The source URL of the image to be displayed in the canvas. */
	export let src: string;
	/** The data URL of the modified image. Updated on pan and zoom actions. */
	export let url: string;
	/** The image quality (0-1) for the JPEG output. Defaults to 0.5 */
	export let quality: number;
	/** The width of the canvas. Defaults to 256 */
	export let width: number;
	/** The height of the canvas. Defaults to 256 */
	export let height: number;
	/** Whether to update the data URL in real time. Defaults to false */
	export let realTime: boolean;
	/** Whether to allow cross-origin images. Defaults to false */
	export let crossOrigin: boolean;
	/** A space-separated list of classes to apply to the canvas element. */
	export let classes: string;
	/** Whether to show the compressed result. Defaults to false */
	export let showCompressedResult: boolean;

	$: src = src || '';
	$: url = url || '';
	$: width = width || 256;
	$: height = height || 256;
	$: quality = quality || 0.5;
	$: realTime = realTime || false;
	$: crossOrigin = crossOrigin || false;
	$: classes = classes || '';
	$: showCompressedResult = showCompressedResult || false;

	let canvas: HTMLCanvasElement;
	let img: HTMLImageElement | undefined;
	let ctx: CanvasRenderingContext2D | null;

	let offsetX = 0;
	let offsetY = 0;
	let scale = 1;
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

	$: img && (img.crossOrigin = crossOrigin ? 'anonymous' : null);
	$: img && (img.src = src);
	$: quality, width, height, offsetX, offsetY, scale, redraw();

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

<canvas bind:this={canvas} {width} {height} class={classes} use:panHandler={transform} />

<style>
	canvas {
		touch-action: none;
		position: relative;
		cursor: move;
	}
</style>
