import React from 'react';
import { useParams } from 'react-router-dom';

import { dateToString, dateToText } from '../../helpers/dateToString';
import { usePresentation, usePresentationSearch } from '../../service/api';
import { PlayerWrapper } from '../../components/PlayerTemp/PlayerWrapper';
import SmallThumbnail from '../../components/SmallThumbnail';

import { Value } from '../../interfaces/Presentations.interface';

import './presentation.css';

export function Presentation() {
    const { id: presentationId } = useParams();
    const { data, isLoading, isError } = usePresentation(presentationId!);

    const {
        data: upcoming,
        isLoading: isLoadingUpcomingLectures,
        // isError,
    } = usePresentationSearch({
        query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation  AirDateTimeUtc:[${dateToString(
            new Date()
        )} TO ${dateToString(
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        )}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
        orderBy: 'RecordDate asc',
        amountPerPage: 24,
    });

    if (isError) {
        return <div>Error. Try reloading the page</div>;
    }

    let description = <div>Loading...</div>;

    if (!isLoading) {
        const { Title, RecordDateLocal, NumberOfViews, PrimaryPresenter } = data;

        description = (
            <div>
                <span className="mb-2 text-2xl font-bold">{Title}</span>
                <div className="flex flex-col space-y-4 text-secondary">
                    <span>{NumberOfViews} Views</span>
                    <span>
                        Recorded on
                        {dateToText(RecordDateLocal)}
                    </span>
                    <span>{PrimaryPresenter}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
            <div className="overflow-hidden ">
                <div className="relative aspect-video min-h-[60vh] w-full max-w-full overflow-hidden rounded-2xl bg-black xl:h-[75vh]">
                    <PlayerWrapper
                        // className="w-full h-full absolute left-0 top-0"
                        presentationId={presentationId!}
                    />
                </div>
                <div className="mt-3 min-h-[12rem] rounded-2xl bg-bgsecondary p-8 pt-7">{description}</div>
            </div>
            <div>
                <h1 className="py-3 text-xl font-bold">Upcoming lectures</h1>
                <div className="grid grid-cols-1 gap-2">
                    {upcoming?.value
                        .slice(0, 5)
                        .map(({ Id, Title, RecordDateLocal, Duration, ThumbnailUrl }: Value) => (
                            <SmallThumbnail
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
        </div>
    );
}
