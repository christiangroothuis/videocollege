import { usePlayCoverInfo } from "../../utils/api";
import React, { useState } from "react";
import { Player } from "./player";
import { GridSpinner } from "../Spinner/spinner";

import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
	presentationId: string;
	className?: string;
}

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
			<button className="underline" onClick={resetErrorBoundary}>
				Try again
			</button>
		</div>
	);
}

export const PlayerWrapper: React.FC<Props> = ({
	presentationId,
	className,
}) => {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
			}}
		>
			<div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
				<PlayerContent presentationId={presentationId} />
			</div>
		</ErrorBoundary>
	);
};

const PlayerContent = ({ presentationId }: Props) => {
	const [skipThumbnail, setSkipThumbnail] = useState(false);

	if (!skipThumbnail) {
		return (
			<PlayerPreview
				presentationId={presentationId}
				onClick={() => setSkipThumbnail(true)}
			/>
		);
	} else {
		return (
			<Player
				presentationId={presentationId!}
				className="w-full h-full flex justify-center items-center"
			/>
		);
	}
};

interface PlayePreviewProps {
	presentationId: string;
	onClick: (value: React.SetStateAction<boolean>) => void;
}
const PlayerPreview: React.FC<PlayePreviewProps> = ({
	presentationId,
	onClick,
}) => {
	const {
		data: coverInfo,
		isLoading,
		isError,
	} = usePlayCoverInfo(presentationId);

	if (isError) return <div>Error. Try reloading the page</div>;
	if (isLoading) return <GridSpinner />;

	return (
		<div
			className="flex items-center justify-center cursor-pointer w-full h-full"
			onClick={() => onClick(true)}
		>
			<img
				className="absolute w-full h-full top-0 left-0 object-cover opacity-0 transition-opacity duration-300"
				src={`https://videocollege.tue.nl${coverInfo.ThumbnailUrl}`}
				alt=""
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						"https://www.vanwijnen.nl/wp-content/uploads/2017/05/BvOF-2018_1213_BBT-gebouw-Atlas-HR-1500x1000.jpg";
				}}
				onLoad={(e) => {
					(e.target as HTMLImageElement).style.opacity = "1";
				}}
			/>
			<div className="relative bg-white rounded-full p-6 shadow-xl">
				<PlayIcon className="w-10 h-10 ml-1 text-bgtertiary" />
			</div>
		</div>
	);
};
