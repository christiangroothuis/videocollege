import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Broadcast } from '../../assets/icons/wifi.svg';

import { dateToText } from '../../helpers/dateToString';
import { msToHHmmss } from '../../helpers/msToHHmmss';
import { stringToColor } from '../../helpers/stringToColor';

export function Thumbnail({
    id,
    title,
    recordDate,
    duration,
    image,
    isLive,
}: {
    id: string;
    title: string;
    recordDate: Date;
    duration: number;
    image?: string | null;
    isLive?: boolean;
}) {
    const HHmmss = msToHHmmss(duration);

    return (
        <Link to={`/presentation/${id}`}>
            <div
                className="mb-2 aspect-video rounded overflow-hidden relative bg-slate-600 blue-gradient"
                style={{ backgroundImage: `linear-gradient(135deg, #38426a 0%, ${stringToColor(id)} 100%)` }}
            >
                {image ? (
                    <img
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                        src={image}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <Broadcast className="opacity-25 text-black w-18 h-18" />
                    </div>
                )}
                <div className="absolute right-0 bottom-0 tabular-nums bg-black bg-opacity-70 font-medium text-xs px-1 rounded-sm m-1">
                    {HHmmss}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="font-bold text-[0.9375rem] line-clamp-1 mb-1">{title}</h2>
                    <span className="text-[0.8125rem] font-medium leading-tight text-tertiary">
                        {dateToText(recordDate)}
                    </span>
                </div>
                {isLive && (
                    <span className="flex h-2.5 w-2.5 relative m-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                )}
            </div>
        </Link>
    );
}
