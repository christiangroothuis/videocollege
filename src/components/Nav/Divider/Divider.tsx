import React from 'react';

interface Props {
    isWide?: boolean;
}

export function Divider({ isWide = false }: Props) {
    return (
        <div className="nav-item-wrapper py-2">
            <div className={`h-[0.125rem] ${isWide ? 'w-20' : 'w-8'} rounded bg-bgtertiary`} />
        </div>
    );
}
