import React, { useLayoutEffect, useRef, useState } from 'react';

import { Video } from './Video';

import './player.css';

export interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    presentationId: string;
    videoUrls: string[];
}

export function Player({ presentationId, videoUrls, className }: PlayerProps) {
    const primaryVideoRef = useRef<HTMLVideoElement>(null);
    const secondaryVideoRef = useRef<HTMLVideoElement>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    const [direction, setDirection] = useState('');
    const [switched, setSwitched] = useState(false);

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
                className={`player-container h-full w-full ${direction} ${
                    videoUrls?.length > 1 && switched ? 'switched' : ''
                } ${videoUrls?.length > 1 ? 'two-streams' : ''}`}
                ref={playerContainerRef}
            >
                <Video videoUrls={videoUrls} primaryVideoRef={primaryVideoRef} secondaryVideoRef={secondaryVideoRef} />
                <span
                    className="absolute top-0 right-0 m-3 cursor-pointer select-none rounded-lg
                             bg-white p-2 font-medium text-bgtertiary shadow-md"
                    onClick={() => setSwitched(!switched)}
                >
                    Switch
                </span>
            </div>
        </div>
    );
}
