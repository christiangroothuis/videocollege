import React from 'react';
import Nav from '../nav/nav';

import '../nav/nav.css';

export function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex w-full h-screen">
            <Nav />
            <div className="ml-20 grow bg-bgprimary p-5">{children}</div>
        </div>
    );
}
