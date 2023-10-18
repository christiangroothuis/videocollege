import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { insertBeforeExtension } from '../../helpers/insertBeforeExtension';
import { dateToText } from '../../helpers/dateToString';
import { msToHHmmss } from '../../helpers/msToHHmmss';
import { stringToColor } from '../../helpers/stringToColor';

import { ReactComponent as Broadcast } from '../../assets/icons/wifi.svg';
import { PlayStatus, Status } from '../../interfaces/Presentations.interface';

export function Thumbnail({
    id,
    title,
    recordDate,
    duration,
    image,
    status,
    playStatus,
}: {
    id: string;
    title: string;
    recordDate: Date;
    duration: number;
    image?: string | null;
    status?: Status;
    playStatus?: PlayStatus;
}) {
    const isLive = playStatus === 'Live';
    const isRecorded = playStatus === 'OnDemand' && status === 'Viewable';
    const isTranscoding = playStatus === 'LiveEnded' && status === 'Recorded';
    const isScheduled =
        (playStatus === 'ScheduledForLive' && status === 'Record') ||
        (playStatus === 'OpenForLive' && status === 'OpenForRecord');

    // Move background gradient to its own component
    const backgroundStyle = useMemo(
        () => ({ backgroundImage: `linear-gradient(135deg, #38426a 0%, ${stringToColor(id)} 100%)` }),
        [id]
    );

    return (
        <Link to={`/presentation/${id}`}>
            <div className="relative mb-2 aspect-video overflow-hidden rounded">
                {image ? (
                    <img
                        src={insertBeforeExtension(image, '_352_198_low')}
                        onLoad={(e) => {
                            (e.target as HTMLImageElement).style.opacity = '1';
                        }}
                        onLoadStart={(e) => {
                            (e.target as HTMLImageElement).style.opacity = '0';
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.background = 'gray';
                        }}
                        className="card h-full w-full object-cover transition-opacity"
                        alt=""
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center" style={backgroundStyle}>
                        <Broadcast className="h-18 w-18 text-black opacity-25" />
                    </div>
                )}
                <div className="absolute right-0 bottom-0 m-2 rounded-sm bg-black bg-opacity-70 px-1 text-xs font-medium tabular-nums">
                    {isRecorded && msToHHmmss(duration)}
                    {isLive && 'Live'}
                    {isTranscoding && 'Transcoding...'}
                    {isScheduled && 'Scheduled'}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="mb-1 text-[0.9375rem] font-bold line-clamp-1">{title}</h2>
                    <span className="text-[0.8125rem] font-medium leading-tight text-tertiary">
                        {dateToText(recordDate)}
                    </span>
                </div>
                {isLive && (
                    <span className="relative m-3 flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    </span>
                )}
            </div>
        </Link>
    );
}
