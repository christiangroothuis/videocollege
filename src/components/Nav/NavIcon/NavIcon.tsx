import React from 'react';

import { motion } from 'framer-motion';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

interface Props {
    to: string;
    noActive?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function NavIcon({ to, className, children, noActive = false }: Props) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    const active = !noActive && match;

    return (
        <div className={`nav-item-wrapper group ${className}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="absolute top-0 left-0 flex h-12
                            w-1 items-center justify-center"
            >
                <span
                    className={`absolute block w-1 -translate-x-1 rounded-r
                                 bg-white transition-all duration-200 ${!noActive && 'group-hover:translate-x-0'}
                                 ${active ? 'h-10 translate-x-0' : 'h-2 group-hover:h-5'}`}
                />
            </motion.div>
            <NavLink to={to}>
                <motion.div
                    layout="position"
                    // initial={{ opacity: 0, scale: 0.3 }}
                    // animate={{ opacity: 1, scale: 1 }}
                    // exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="relative h-12 w-12 cursor-pointer"
                >
                    <div
                        className={`relative h-12 w-12 overflow-hidden
                                bg-bgtertiary transition-all duration-200
                                group-hover:rounded-2xl
                                ${active ? 'rounded-2xl' : 'rounded-3xl'}`}
                        // Move style to its own class
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                    >
                        <div
                            className={`blue-gradient absolute top-0 left-0 h-full
                                w-full opacity-0 transition-opacity duration-200
                                ${!noActive && 'group-hover:opacity-100'}
                                ${active ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <div
                            className="absolute top-0 left-0 flex h-full w-full
                                 items-center justify-center"
                        >
                            {children}
                        </div>
                    </div>
                </motion.div>
            </NavLink>
        </div>
    );
}
