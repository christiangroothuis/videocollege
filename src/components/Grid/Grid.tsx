import React, { useLayoutEffect, useRef, useState } from 'react';

import { Value } from '@/interfaces/Presentations.interface';

import Thumbnail from '../Thumbnail';
import ThumbnailSkeleton from '../ThumbnailSkeleton';

interface Props {
    title?: string;
    isLoading: boolean;
    rows?: number;
    presentations: Value[];
}

export function Grid({ title, isLoading, rows = 4, presentations }: Props) {
    const innerSectionRef = useRef<HTMLDivElement>(null);
    const [limit, setLimit] = useState(0);

    let columns = 0;
    let visiblePresentations = presentations;

    useLayoutEffect(() => {
        const handleWindowResize = () => {
            if (innerSectionRef.current) {
                columns = getComputedStyle(innerSectionRef.current)
                    .getPropertyValue('grid-template-columns')
                    .split(' ').length;

                if (rows) {
                    setLimit(columns * rows);
                }
            }
        };

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [rows]);

    if (rows) {
        visiblePresentations = presentations?.slice(0, limit);
    }

    return (
        <div className="mb-8">
            {title && <h1 className="font-bold text-2xl mb-4 line-clamp-1">{title}</h1>}

            <div
                className="grid gap-4 gap-y-6
                        grid-cols-[repeat(auto-fill,minmax(min(16rem,_100%),1fr))]"
                ref={innerSectionRef}
            >
                {isLoading
                    ? /* eslint-disable react/no-array-index-key */
                      [...Array(limit)].map((_, i) => <ThumbnailSkeleton key={i} />)
                    : visiblePresentations?.map(({ Id, Title, RecordDateLocal, Duration, ThumbnailUrl }: Value) => (
                          <Thumbnail
                              key={Id}
                              id={Id}
                              title={Title}
                              recordDate={RecordDateLocal}
                              duration={Duration}
                              image={ThumbnailUrl}
                          />
                      ))}
            </div>
        </div>
    );
}
