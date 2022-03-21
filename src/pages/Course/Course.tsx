import React from 'react';
import { useParams } from 'react-router-dom';

import { useLastLectures, useNextLectures } from '../../service/api';

import Grid from '../../components/Grid';

export function Course() {
    const { id: folderId } = useParams();

    const { data, isLoading: isLoadingUpcomingLectures, isError } = useNextLectures(folderId!);
    const { data: data2, isLoading: isLoadingLastLectures, isError: isError2 } = useLastLectures(folderId!);

    return (
        <>
            {isLoadingUpcomingLectures ? (
                <h1 className="card mb-4 w-1/4 animate-pulse rounded text-3xl font-bold text-red-500/0">Course</h1>
            ) : (
                <h1 className="mb-4 text-3xl font-bold">{data?.value[0]?.ParentFolderName}</h1>
            )}
            <Grid
                title="Upcoming lectures"
                isLoading={isLoadingUpcomingLectures}
                rows={2}
                presentations={data?.value}
            />
            <Grid title="Last lectures" isLoading={isLoadingLastLectures} presentations={data2?.value} />
        </>
    );
}
