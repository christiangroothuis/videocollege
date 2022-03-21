import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Broadcast } from '../../assets/icons/wifi.svg';

import { insertBeforeExtension } from '../../helpers/insertBeforeExtension';
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
                className="blue-gradient relative mb-2 aspect-video overflow-hidden rounded bg-slate-600"
                style={{ backgroundImage: `linear-gradient(135deg, #38426a 0%, ${stringToColor(id)} 100%)` }}
            >
                {image ? (
                    <img
                        src={insertBeforeExtension(image, '_352_198_low')}
                        className="h-full w-full object-cover"
                        alt=""
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Broadcast className="h-18 w-18 text-black opacity-25" />
                    </div>
                )}
                <div className="absolute right-0 bottom-0 m-1 rounded-sm bg-black bg-opacity-70 px-1 text-xs font-medium tabular-nums">
                    {HHmmss}
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
