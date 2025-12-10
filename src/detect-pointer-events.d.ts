declare module 'detect-pointer-events' {
	const detectPointerEvents: {
		hasApi: boolean;
		update: () => void;
		any: () => boolean;
		prefix: (eventName: string) => string;
		maxTouchPoints: number;
	};
	export default detectPointerEvents;
}

