import { useEffect, useRef, useState } from "react";
import HlsPlayer from "react-hls-player";
import { usePlayCoverInfo, usePlayerOptions } from "../../utils/api";
import "../player.css";

import { Stream, VideoURL } from "../../interfaces/PlayerOptions.interface";

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

	const streams = playerOptions?.Presentation?.Streams.map(
		(stream: Stream) => {
			return stream.VideoUrls.filter((videoUrl: VideoURL) => {
				return videoUrl.MimeType === "audio/x-mpegurl";
			})[0];
		}
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
			<div
				className={`player-container w-full h-full ${direction} ${
					streams?.length > 1 && switched ? "switched" : ""
				} ${streams?.length > 1 ? "two-streams" : ""}`}
				ref={playerContainerRef}
			>
				{streams?.length > 0 &&
					streams.map(({ Location }: VideoURL, i: number) => {
						return (
							<div key={i}>
								<HlsPlayer
									src={Location}
									autoPlay={true}
									controls={false}
									muted={i !== 0}
									playerRef={
										i === 0
											? primaryVideoRef
											: secondaryVideoRef
									}
								/>
								<div className="overlay"></div>
							</div>
						);
					})}
				<span className="top-0 left-0 absolute font-medium">
					{coverInfo?.Title}
				</span>
				<span
					className="top-0 left-0 absolute font-medium"
					onClick={() => setSwitched(!switched)}
				>
					Switch
				</span>
			</div>
		</div>
	);
};
