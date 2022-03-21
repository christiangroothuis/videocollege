import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import { ReactComponent as Broadcast } from '../../../assets/icons/wifi.svg';

import { dateToText } from '../../../helpers/dateToString';
import { msToHHmmss } from '../../../helpers/msToHHmmss';
import { stringToColor } from '../../../helpers/stringToColor';

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
            <div className={`h-18 ${active ? 'bg-bgtertiary' : 'bg-bgsecondary'} flex items-center rounded-xl p-2.5`}>
                <div
                    className="blue-gradient mr-3 flex aspect-square h-full items-center justify-center rounded-md"
                    // src={insertBeforeExtension(image, '_122_63_low')}
                    style={{ backgroundImage: `linear-gradient(135deg, #38426a 0%, ${stringToColor(id)} 100%)` }}
                >
                    <Broadcast className="h-8 w-8 text-black opacity-25" />
                </div>
                <div className="grow">
                    <div className="font-semibold line-clamp-1">{title}</div>
                    <div className="text-md text-sm text-tertiary">{dateToText(recordDate)}</div>
                </div>
                <div className="text-sm font-medium text-tertiary">{HHmmss}</div>
            </div>
        </Link>
    );
}
