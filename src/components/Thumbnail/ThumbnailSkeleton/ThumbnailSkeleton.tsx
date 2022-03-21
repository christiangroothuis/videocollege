import React from 'react';

export function ThumbnailSkeleton() {
    return (
        <div className="animate-pulse text-red-500/0">
            <div className="card mb-2 aspect-video rounded" />
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <h2 className="card mb-1 w-60 rounded text-[0.9375rem] line-clamp-1">Title</h2>
                    <span className="card w-32 rounded text-[0.8125rem] leading-tight">Date</span>
                </div>
            </div>
        </div>
    );
}
