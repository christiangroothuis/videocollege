import React from 'react';

import Grid from '../../components/Grid';

import { usePresentationSearch } from '../../service/api';
import { dateToString } from '../../helpers/dateToString';

export function Home() {
    const {
        data,
        isLoading: isLoadingUpcomingLectures,
        isError,
    } = usePresentationSearch({
        query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation  AirDateTimeUtc:[${dateToString(
            new Date()
        )} TO ${dateToString(
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        )}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
        orderBy: 'RecordDate asc',
        amountPerPage: 12,
    });
    const { data: data2, isLoading: isLoadingLastLectures } = usePresentationSearch({
        query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation AirDateTimeUtc:[${dateToString(
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        )} TO ${dateToString(
            new Date()
        )}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
        amountPerPage: 12,
    });

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
