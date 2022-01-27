import React from "react";
import { VideoURL } from "@/interfaces/PlayerOptions.interface";
import HlsPlayer from "react-hls-player";

export const Video = React.memo(
	({
		streams,
		primaryVideoRef,
		secondaryVideoRef,
	}: {
		streams: VideoURL[];
		primaryVideoRef: React.RefObject<HTMLVideoElement>;
		secondaryVideoRef: React.RefObject<HTMLVideoElement>;
	}) => {
		return (
			<>
				{streams?.length > 0 &&
					streams.map(({ Location }: VideoURL, i: number) => {
						return (
							<div
								className="video rounded-lg overflow-hidden"
								key={Location}
							>
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
								<div className="overlay rounded-lg"></div>
							</div>
						);
					})}
			</>
		);
	},
	// Only rerender when the stream urls have changed
	({ streams: prevStreams }, { streams: nextStreams }) => {
		if (prevStreams !== nextStreams) {
			return false;
		}

		return true;
	}
);
