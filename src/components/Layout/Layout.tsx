import React from 'react';
import Nav from '../Nav';

export function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full">
            <Nav />
            <div className="ml-20 grow bg-bgprimary p-5">{children}</div>
        </div>
    );
}
