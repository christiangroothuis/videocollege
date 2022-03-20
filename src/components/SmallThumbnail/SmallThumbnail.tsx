import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import { ReactComponent as Broadcast } from '../../assets/icons/wifi.svg';

import { dateToText } from '../../helpers/dateToString';
import { msToHHmmss } from '../../helpers/msToHHmmss';
import { stringToColor } from '../../helpers/stringToColor';

export function SmallThumbnail({
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
    const to = `/presentation/${id}`;

    const HHmmss = msToHHmmss(duration);

    const resolved = useResolvedPath(to);
    const active = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link to={to}>
            <div className={`h-18 ${active ? 'bg-bgtertiary' : 'bg-bgsecondary'} p-2.5 rounded-xl flex items-center`}>
                <div
                    className="aspect-square h-full blue-gradient rounded-md mr-3 flex justify-center items-center"
                    style={{ backgroundImage: `linear-gradient(135deg, #38426a 0%, ${stringToColor(id)} 100%)` }}
                >
                    <Broadcast className="opacity-25 text-black w-8 h-8" />
                </div>
                <div className="grow">
                    <div className="font-semibold line-clamp-1">{title}</div>
                    <div className="text-tertiary text-md text-sm">{dateToText(recordDate)}</div>
                </div>
                <div className="text-tertiary font-medium text-sm">{HHmmss}</div>
            </div>
        </Link>
    );
}
