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
