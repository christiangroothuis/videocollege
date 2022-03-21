import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { usePlayCoverInfo, usePlayerOptions } from '../../service/api';

import { Player } from './Player';
import GridSpinner from '../GridSpinner';
import Preview from './Preview';

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

    // TODO Check if stream is started with GetLiveStatus
    if (coverInfoIsLoading || playerOptionsIsLoading) {
        return <GridSpinner />;
    }
    if (coverInfoIsError || playerOptionsIsError) {
        return <div>Error. Try reloading the page</div>;
    }

    if (!skipThumbnail) {
        return (
            <Preview thumbnailUrl={playerOptions.Presentation.ThumbnailUrl} onClick={() => setSkipThumbnail(true)} />
        );
    }
    return (
        <Player
            playerOptions={playerOptions}
            presentationId={presentationId!}
            className="flex h-full w-full items-center justify-center"
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
        <div role="alert" className="flex h-full flex-col items-center justify-center bg-black">
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
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                <PlayerContent presentationId={presentationId} />
            </div>
        </ErrorBoundary>
    );
}
