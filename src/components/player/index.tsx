import { useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Video } from "./video";
import { usePlayCoverInfo, usePlayerOptions } from "../../utils/api";
import { Stream, VideoURL } from "../../interfaces/PlayerOptions.interface";

import "./player.css";

function ErrorFallback({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: (...args: Array<unknown>) => void;
}) {
	return (
		<div
			role="alert"
			className="flex flex-col h-full justify-center items-center bg-black"
		>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			{error.message === "_ref2 is undefined" && (
				<div className="text-center text-xl my-3">
					This type of lecture is not supported :(
					<br />
					Support may be added in the future.
				</div>
			)}
			<button className="underline" onClick={resetErrorBoundary}>
				Try again
			</button>
		</div>
	);
}

export interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
	presentationId: string;
}

export const Player = ({ presentationId, ...props }: PlayerProps) => {
	const primaryVideoRef = useRef<HTMLVideoElement>(null);
	const secondaryVideoRef = useRef<HTMLVideoElement>(null);
	const playerContainerRef = useRef<HTMLDivElement>(null);

	const [direction, setDirection] = useState("");
	const [switched, setSwitched] = useState(false);

	const {
		data: coverInfo,
		// isLoading,
		// isError,
	} = usePlayCoverInfo(presentationId);
	const {
		data: playerOptions,
		// isLoading,
		// isError,
	} = usePlayerOptions(presentationId);

	const streams = useMemo(
		() =>
			playerOptions?.Presentation?.Streams.map((stream: Stream) => {
				return stream.VideoUrls.filter((videoUrl: VideoURL) => {
					return videoUrl.MimeType === "audio/x-mpegurl";
				})[0];
			}),
		[playerOptions]
	);

	useEffect(() => {
		const handler = () => {
			if (playerContainerRef?.current?.clientHeight) {
				const aspectRatio =
					playerContainerRef.current.clientWidth /
					playerContainerRef.current.clientHeight;

				if (aspectRatio < 0.88) {
					setDirection("vertical");
				} else if (aspectRatio > 2.29) {
					setDirection("wide");
				} else if (aspectRatio > 1.5) {
					setDirection("horizontal");
				} else if (aspectRatio > 1.3) {
					setDirection("regular");
				} else {
					setDirection("");
				}
			}
		};

		handler();

		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	}, []);

	useEffect(() => {
		// const element: any = primaryVideoRef?.current;
		// element?.addEventListener("play", () =>
		// 	elementsRef.current.map((item: any) => item.pause())
		// );
		// console.log(elementsRef);
		// console.log(primaryVideoRef);
	}, [primaryVideoRef]);

	return (
		<div {...props}>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					// reset the state of your app so the error doesn't happen again
				}}
			>
				<div
					className={`player-container w-full h-full ${direction} ${
						streams?.length > 1 && switched ? "switched" : ""
					} ${streams?.length > 1 ? "two-streams" : ""}`}
					ref={playerContainerRef}
				>
					<Video
						streams={streams}
						primaryVideoRef={primaryVideoRef}
						secondaryVideoRef={secondaryVideoRef}
					/>
					<span
						className="top-0 right-0 absolute font-medium"
						onClick={() => setSwitched(!switched)}
					>
						Switch
					</span>
				</div>
			</ErrorBoundary>
		</div>
	);
};
