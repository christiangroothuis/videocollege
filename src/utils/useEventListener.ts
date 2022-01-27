// import { SyntheticEvent, useEffect, useRef } from "react";

// export const useEventListener = (
// 	eventName: string,
// 	handler: any,
// 	element: Window = window
// ) => {
// 	// Create a ref that stores handler
// 	const savedHandler = useRef();

// 	// Update ref.current value if handler changes.
// 	// This allows our effect below to always get latest handler ...
// 	// ... without us needing to pass it in effect deps array ...
// 	// ... and potentially cause effect to re-run every render.
// 	useEffect(() => {
// 		savedHandler.current = handler;
// 	}, [handler]);

// 	useEffect(
// 		() => {
// 			const isSupported = element && element.addEventListener;
// 			if (!isSupported) return;

// 			const eventListener = (e: any) => savedHandler.current(e);

// 			element.addEventListener(eventName, eventListener);

// 			// Remove event listener on cleanup
// 			return () => {
// 				element.removeEventListener(eventName, eventListener);
// 			};
// 		},
// 		[eventName, element] // Re-run if eventName or element changes
// 	);
// };

import { RefObject, useEffect, useRef } from "react";

function useEventListener<K extends keyof WindowEventMap>(
	eventName: K,

	handler: (event: WindowEventMap[K]) => void
): void;

function useEventListener<
	K extends keyof HTMLElementEventMap,
	T extends HTMLElement = HTMLDivElement
>(
	eventName: K,

	handler: (event: HTMLElementEventMap[K]) => void,

	element: RefObject<T>
): void;

function useEventListener<
	KW extends keyof WindowEventMap,
	KH extends keyof HTMLElementEventMap,
	T extends HTMLElement | void = void
>(
	eventName: KW | KH,

	handler: (
		event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event
	) => void,

	element?: RefObject<T>
) {
	// Create a ref that stores handler

	const savedHandler = useRef<typeof handler>();

	useEffect(() => {
		// Define the listening target

		const targetElement: T | Window = element?.current || window;

		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		// Update saved handler if necessary

		if (savedHandler.current !== handler) {
			savedHandler.current = handler;
		}

		// Create event listener that calls handler function stored in ref

		const eventListener: typeof handler = (event) => {
			// eslint-disable-next-line no-extra-boolean-cast

			if (!!savedHandler?.current) {
				savedHandler.current(event);
			}
		};

		targetElement.addEventListener(eventName, eventListener);

		// Remove event listener on cleanup

		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element, handler]);
}

export default useEventListener;
