import React from 'react';

interface Props {
    key?: number;
}

export function PresentationSkeleton({ key = 0 }: Props) {
    return (
        <div key={key}>
            <div className="mb-2 aspect-video rounded overflow-hidden relative bg-gray-800" />
            <div className="bg-gray-800 h-5 w-60 mb-2 rounded" />
            <div className="bg-gray-800 h-4 w-32 rounded" />
        </div>
    );
}
