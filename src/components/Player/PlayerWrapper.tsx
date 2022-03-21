import React, { useState } from 'react';

import { usePlayCoverInfo, usePlayerOptions } from '../../service/api';

import { Player } from './Player';
import GridSpinner from '../GridSpinner';
import Preview from './Preview';
import ErrorBound from './ErrorBound';

import { Stream, VideoURL } from '../../interfaces/PlayerOptions.interface';

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

    const streams = playerOptions?.Presentation?.Streams.map(
        (stream: Stream) =>
            stream.VideoUrls.filter((videoUrl: VideoURL) => videoUrl.MimeType === 'audio/x-mpegurl')[0].Location
    );

    return (
        <Player
            videoUrls={streams}
            presentationId={presentationId!}
            className="flex h-full w-full items-center justify-center"
        />
    );
}

export function PlayerWrapper({ presentationId }: Props) {
    return (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
            <ErrorBound>
                <PlayerContent presentationId={presentationId} />
            </ErrorBound>
        </div>
    );
}
