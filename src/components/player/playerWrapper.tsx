import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { usePlayCoverInfo, usePlayerOptions } from '../../service/api';
import { Player } from './player';
import GridSpinner from '../GridSpinner';

import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';

import { PlayCoverInfo } from '../../interfaces/PlayCoverInfo.interface';
import { PlayerOptions } from '../../interfaces/PlayerOptions.interface';

interface PlayerPreviewProps {
    coverInfo: PlayerOptions;
    onClick: (value: React.SetStateAction<boolean>) => void;
}

function PlayerPreview({ coverInfo, onClick }: PlayerPreviewProps) {
    return (
        <div className="flex items-center justify-center cursor-pointer w-full h-full" onClick={() => onClick(true)}>
            <img
                className="absolute w-full h-full top-0 left-0 object-cover opacity-0 transition-opacity duration-300"
                src={`https://videocollege.tue.nl${coverInfo.Presentation.ThumbnailUrl}`}
                alt=""
                // onError={(e) => {
                // 	(e.target as HTMLImageElement).src =
                // 		"https://www.vanwijnen.nl/wp-content/uploads/2017/05/BvOF-2018_1213_BBT-gebouw-Atlas-HR-1500x1000.jpg";
                // }}
                onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '1';
                }}
            />
            <div className="relative bg-white rounded-full p-6 shadow-xl">
                <PlayIcon className="w-10 h-10 ml-1 text-bgtertiary" />
            </div>
        </div>
    );
}

interface Props {
    presentationId: string;
}

function PlayerContent({ presentationId }: Props) {
    const [skipThumbnail, setSkipThumbnail] = useState(false);

    const {
        data: coverInfo,
        isLoading: coverInfoIsLoading,
        isError: coverInfoIsError,
    } = usePlayCoverInfo(presentationId);

    const {
        data: playerOptions,
        isLoading: playerOptionsIsLoading,
        isError: playerOptionsIsError,
    } = usePlayerOptions(presentationId);

    // Check if stream is started with GetLiveStatus
    if (coverInfoIsLoading || playerOptionsIsLoading) {
        return <GridSpinner />;
    }
    if (coverInfoIsError || playerOptionsIsError) {
        return <div>Error. Try reloading the page</div>;
    }

    if (!skipThumbnail) {
        return <PlayerPreview coverInfo={playerOptions} onClick={() => setSkipThumbnail(true)} />;
    }
    return (
        <Player
            playerOptions={playerOptions}
            presentationId={presentationId!}
            className="w-full h-full flex justify-center items-center"
        />
    );
}

function ErrorFallback({
    error,
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}) {
    return (
        <div role="alert" className="flex flex-col h-full justify-center items-center bg-black">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button className="underline" onClick={resetErrorBoundary} type="button">
                Try again
            </button>
        </div>
    );
}

export function PlayerWrapper({ presentationId }: Props) {
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
}
