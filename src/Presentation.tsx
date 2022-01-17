import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HlsPlayer from "react-hls-player";

export const Presentation = () => {
	const { id: presentationId } = useParams();
	const [data, setdata] = useState<any>({});

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:8080/proxy/Mediasite/PlayerService/PlayerService.svc/json/GetPlayerOptions",
				{
					getPlayerOptionsRequest: {
						ResourceId: presentationId,
						QueryString:
							"?autostart=true&playfrom=0&covertitle=false&cover=false",
						UseScreenReader: false,
					},
				},
				{
					headers: {
						"content-type": "application/json; charset=UTF-8",
					},
					withCredentials: true,
				}
			);

			setdata(response.data);

			console.log(response.data.d.Presentation.Streams);
		};

		fetchData();
	}, []);

	const playerRef = useRef<HTMLVideoElement>(null);

	return (
		<div>
			<h1 className="font-bold text-4xl">Presentation</h1>
			{data.d?.Presentation?.Streams?.length > 0 ? (
				<div className="flex">
					{data.d.Presentation.Streams.map((stream: any) => {
						return (
							<HlsPlayer
								src={stream.VideoUrls[0].Location}
								autoPlay={false}
								controls={true}
								playerRef={playerRef}
								width="100%"
								height="auto"
							/>
						);
					})}
				</div>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
};
