declare const prefixMap: {
	pointerdown: string;
	pointerup: string;
	pointercancel: string;
	pointermove: string;
	pointerover: string;
	pointerout: string;
	pointerenter: string;
	pointerleave: string;
	gotpointercapture: string;
	lostpointercapture: string;
	maxTouchPoints: string;
};

export interface DetectPointerEvents {
	hasApi: boolean;
	requiresPrefix: boolean | undefined;
	hasTouch: boolean | undefined;
	maxTouchPoints: number | undefined;
	update: () => void;
	prefix: (value: keyof typeof prefixMap) => string;
}

declare const detectPointerEvents: DetectPointerEvents;

export default detectPointerEvents;
