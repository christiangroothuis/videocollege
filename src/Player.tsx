import { createRef, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import HlsPlayer from "react-hls-player";
import { useParams } from "react-router-dom";
import { usePlayCoverInfo, usePlayerOptions } from "./utils/fetcher";

export const Player = () => {
	const primaryVideoRef = useRef<HTMLVideoElement>(null);
	const secondaryVideoRef = useRef<HTMLVideoElement>(null);
	const playerContainerRef = useRef<any>(null);
	const [direction, setDirection] = useState("");
	const [switched, setSwitched] = useState(false);

	const { id: presentationId } = useParams();

	const {
		data: coverInfo,
		isLoading,
		isError,
	} = usePlayCoverInfo(presentationId);
	const {
		data: playerOptions,
		// isLoading,
		// isError,
	} = usePlayerOptions(presentationId);

	const streams = playerOptions?.Presentation?.Streams.map((stream: any) => {
		return stream.VideoUrls.filter((videoUrl: any) => {
			return videoUrl.MimeType === "audio/x-mpegurl";
		})[0];
	});

	useEffect(() => {
		const handler = () => {
			if (playerContainerRef.current.clientHeight) {
				const aspectRatio =
					playerContainerRef.current.clientWidth /
					playerContainerRef.current.clientHeight;

				if (aspectRatio < 0.87) {
					setDirection("vertical");
				} else if (aspectRatio > 2) {
					setDirection("wide");
				} else if (aspectRatio > 1.3) {
					setDirection("horizontal");
				} else {
					setDirection("");
				}
			}
		};

		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	});

	useEffect(() => {
		const element: any = primaryVideoRef?.current;
		// element?.addEventListener("play", () =>
		// 	elementsRef.current.map((item: any) => item.pause())
		// );
		// console.log(elementsRef);
		console.log(primaryVideoRef);
	}, [primaryVideoRef]);

	return (
		<div className="flex items-center justify-center w-screen h-screen absolute bg-gray-900">
			<div
				className={`player-container ${direction} ${
					switched ? "switched" : ""
				}`}
				ref={playerContainerRef}
			>
				{streams?.length > 0 &&
					streams.map((stream: any, i: number) => {
						return (
							<div
								key={i}
								className={`relative m-1 border-neutral-500 border-4 aspect-video max-h-full max-w-full ${
									i === 0
										? `w-full`
										: direction === "vertical"
										? `w-full`
										: `grow`
								}`}
							>
								<HlsPlayer
									src={stream.Location}
									autoPlay={false}
									controls={false}
									muted={i !== 0}
									playerRef={
										i === 0
											? primaryVideoRef
											: secondaryVideoRef
									}
									className="absolute w-full h-full top-0 left-0 object-cover"
								/>
							</div>
						);
					})}
				<span className="top-0 left-0 absolute font-medium">
					{direction}
				</span>
				{/* <div
					className="top-0 left-0 absolute font-medium"
					onClick={() => setStreams([streams[1], streams[0]])}
				>
					Switch
				</div> */}
			</div>
		</div>
	);
};
