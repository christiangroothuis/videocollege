import React from 'react';

import { ReactComponent as PlayIcon } from '../../../assets/icons/play.svg';

interface PreviewProps {
    thumbnailUrl?: string;
    onClick: (value: React.SetStateAction<boolean>) => void;
}

export function Preview({ thumbnailUrl, onClick }: PreviewProps) {
    return (
        <div className="flex h-full w-full cursor-pointer items-center justify-center" onClick={() => onClick(true)}>
            {thumbnailUrl && (
                <img
                    className="absolute top-0 left-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
                    src={`https://videocollege.tue.nl${thumbnailUrl}`}
                    alt=""
                    onLoad={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '1';
                    }}
                />
            )}
            <div className="relative rounded-full bg-white p-6 shadow-xl">
                <PlayIcon className="ml-1 h-10 w-10 text-bgtertiary" />
            </div>
        </div>
    );
}
