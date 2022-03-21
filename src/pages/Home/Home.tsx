import React from 'react';

import Grid from '../../components/Grid';

import { useLastLectures, useNextLectures } from '../../service/api';

export function Home() {
    const { data, isLoading: isLoadingUpcomingLectures, isError } = useNextLectures();
    const { data: data2, isLoading: isLoadingLastLectures, isError: isError2 } = useLastLectures();

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
