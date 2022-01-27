import { useEffect, useMemo, useRef, useState } from "react";

import { Stream, VideoURL } from "@/interfaces/PlayerOptions.interface";

import { Video } from "./video";
import { usePlayerOptions } from "../../utils/api";
import { GridSpinner } from "../Spinner/spinner.js";

import "./player.css";

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
		data: playerOptions,
		isLoading,
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
				} else if (aspectRatio > 1.32) {
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

	if (isLoading) return <GridSpinner />;

	return (
		<div {...props}>
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
					className="top-0 right-0 absolute font-medium p-2 select-none cursor-pointer bg-white text-bgtertiary rounded-lg m-3 shadow-md"
					onClick={() => setSwitched(!switched)}
				>
					Switch
				</span>
			</div>
		</div>
	);
};
