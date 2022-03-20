import React from 'react';

export function ThumbnailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="mb-2 aspect-video rounded card" />
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <h2 className="card w-60 text-[0.9375rem] line-clamp-1 mb-1 text-red-500/0 rounded">Title</h2>
                    <span className="card w-32 text-[0.8125rem] leading-tight text-red-500/0 rounded">Date</span>
                </div>
            </div>
        </div>
    );
}
