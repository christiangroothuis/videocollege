import React from 'react';
import HlsPlayer from 'react-hls-player';

import { VideoURL } from '../../interfaces/PlayerOptions.interface';

interface VideoProps {
    videoUrls: string[];
    primaryVideoRef: React.RefObject<HTMLVideoElement>;
    secondaryVideoRef: React.RefObject<HTMLVideoElement>;
}

export const Video = React.memo(
    ({ videoUrls, primaryVideoRef, secondaryVideoRef }: VideoProps) => {
        return (
            <>
                {videoUrls.map((videoUrl, i) => (
                    <div className="video overflow-hidden rounded-lg" key={videoUrl}>
                        <HlsPlayer
                            src={videoUrl}
                            autoPlay
                            controls={false}
                            muted={i !== 0}
                            playerRef={i === 0 ? primaryVideoRef : secondaryVideoRef}
                        />
                        <div className="overlay rounded-lg" />
                    </div>
                ))}
            </>
        );
    },
    // Only rerender when the stream urls have changed
    ({ videoUrls: prevVideoUrls }, { videoUrls: nextVideoUrls }) => {
        if (prevVideoUrls !== nextVideoUrls) {
            return false;
        }

        return true;
    }
);
