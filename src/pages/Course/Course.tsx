import React from 'react';
import { useParams } from 'react-router-dom';

import { dateToString } from '../../helpers/dateToString';
import { usePresentationSearch } from '../../service/api';

import Grid from '../../components/Grid';

export function Course() {
    const { id: folderId } = useParams();

    const {
        data,
        isLoading: isLoadingUpcomingLectures,
        isError,
    } = usePresentationSearch({
        // query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation  AirDateTimeUtc:[${dateToString(
        query: `Type:Presentation  AirDateTimeUtc:[${dateToString(new Date())} TO ${dateToString(
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        )}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True
        AND (ParentFolderId:${folderId})`,
        orderBy: 'RecordDate asc',
        amountPerPage: 12,
    });
    const { data: data2, isLoading: isLoadingLastLectures } = usePresentationSearch({
        query: `ParentFolderId:${folderId} Type:Presentation AirDateTimeUtc:[${dateToString(
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        )} TO ${dateToString(
            new Date()
        )}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True
        AND ParentFolderId:${folderId}`,
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
