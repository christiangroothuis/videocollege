import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { PlayerOptions, Stream, VideoURL } from '../../interfaces/PlayerOptions.interface';

import { Video } from './video';

import './player.css';

export interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    presentationId: string;
    playerOptions: PlayerOptions;
}

export function Player({ presentationId, playerOptions, className }: PlayerProps) {
    const primaryVideoRef = useRef<HTMLVideoElement>(null);
    const secondaryVideoRef = useRef<HTMLVideoElement>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [direction, setDirection] = useState('');
    const [switched, setSwitched] = useState(false);

    const streams = useMemo(
        () =>
            playerOptions?.Presentation?.Streams.map(
                (stream: Stream) =>
                    stream.VideoUrls.filter((videoUrl: VideoURL) => videoUrl.MimeType === 'audio/x-mpegurl')[0]
            ),
        [playerOptions]
    );

    useLayoutEffect(() => {
        const handleWindowResize = () => {
            if (playerContainerRef?.current?.clientHeight) {
                const aspectRatio = playerContainerRef.current.clientWidth / playerContainerRef.current.clientHeight;

                if (aspectRatio < 0.88) {
                    setDirection('vertical');
                } else if (aspectRatio > 2.29) {
                    setDirection('wide');
                } else if (aspectRatio > 1.5) {
                    setDirection('horizontal');
                } else if (aspectRatio > 1.32) {
                    setDirection('regular');
                } else {
                    setDirection('');
                }
            }
        };

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return (
        <div className={className}>
            <div
                className={`player-container w-full h-full ${direction} ${
                    streams?.length > 1 && switched ? 'switched' : ''
                } ${streams?.length > 1 ? 'two-streams' : ''}`}
                ref={playerContainerRef}
            >
                <Video streams={streams} primaryVideoRef={primaryVideoRef} secondaryVideoRef={secondaryVideoRef} />
                <span
                    className="top-0 right-0 absolute font-medium p-2 select-none cursor-pointer
                             bg-white text-bgtertiary rounded-lg m-3 shadow-md"
                    onClick={() => setSwitched(!switched)}
                >
                    Switch
                </span>
            </div>
        </div>
    );
}
