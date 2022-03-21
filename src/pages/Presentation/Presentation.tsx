import React from 'react';
import { useParams } from 'react-router-dom';

import { dateToText } from '../../helpers/dateToString';
import { useNextLectures, usePresentation } from '../../service/api';
import { PlayerWrapper } from '../../components/Player/PlayerWrapper';
import SmallThumbnail from '../../components/Thumbnail/SmallThumbnail';
import SmallThumbnailSkeleton from '../../components/Thumbnail/SmallThumbnailSkeleton';

import { Value } from '../../interfaces/Presentations.interface';

import './presentation.css';

export function Presentation() {
    const { id: presentationId } = useParams();

    const { data, isLoading, isError } = usePresentation(presentationId!);

    const {
        data: upcomingLectures,
        isLoading: isLoadingUpcomingLectures,
        // isError,
    } = useNextLectures();

    if (isError) {
        return <div>Error. Try reloading the page</div>;
    }

    let description = (
        <div className="flex animate-pulse flex-col text-red-500/0">
            <span className="card mb-3 w-3/4 rounded text-2xl">Title</span>
            <div className="flex flex-col space-y-2 ">
                <span className="card w-1/2 rounded">Views</span>
                <span className="card w-1/5 rounded">Recorded</span>
                <span className="card w-1/3 rounded">Presenter</span>
            </div>
        </div>
    );

    if (!isLoading) {
        const { Title, RecordDateLocal, NumberOfViews, PrimaryPresenter } = data;

        description = (
            <div className="flex flex-col">
                <span className="mb-3 text-2xl font-bold">{Title}</span>
                <div className="flex flex-col space-y-2 text-secondary">
                    <span>{NumberOfViews} Views</span>
                    <span>Recorded on {dateToText(RecordDateLocal)}</span>
                    <span>Presenter: {PrimaryPresenter}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
            <div className="overflow-hidden ">
                <div className="relative aspect-video min-h-[60vh] w-full max-w-full overflow-hidden rounded-2xl bg-black xl:h-[75vh]">
                    <PlayerWrapper presentationId={presentationId!} />
                </div>
                <div className="mt-3 min-h-[12rem] rounded-2xl bg-bgsecondary p-8 pt-7">{description}</div>
            </div>
            <div>
                <h1 className="py-3 text-xl font-bold">Upcoming lectures</h1>
                <div className="grid grid-cols-1 gap-2">
                    {!isLoadingUpcomingLectures
                        ? upcomingLectures?.value
                              .slice(0, 6)
                              .map(({ Id, Title, RecordDateLocal, Duration, ThumbnailUrl }: Value) => (
                                  <SmallThumbnail
                                      key={Id}
                                      id={Id}
                                      title={Title}
                                      recordDate={RecordDateLocal}
                                      duration={Duration}
                                      image={ThumbnailUrl}
                                  />
                              ))
                        : [...Array(6)].map((_, i) => (
                              /* eslint-disable react/no-array-index-key */
                              <SmallThumbnailSkeleton key={i} />
                          ))}
                </div>
            </div>
        </div>
    );
}
