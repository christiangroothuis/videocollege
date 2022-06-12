import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Divider from './Divider';
import NavIcon from './NavIcon';

import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Clock } from '../../assets/icons/clock.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Github } from '../../assets/icons/github.svg';
import { ReactComponent as Logo } from '../../assets/tue-logo/logo-old.svg';

import './nav.css';

export function Nav() {
    const [courses, setCourses] = useState([
        { name: '3IC30 [2021-2022]', id: '80ee9f559585422fa33ab82c9c19355a14' },
        { name: '2IAB0 [2021-2022', id: '2011669edf764e00ae385e61eb5b8a4e14' },
        { name: '2IL50 [2021-2022]', id: '0a19c5499aec4b4a98f5d4a538bf090214' },
    ]);

    const remove = (id: string) => {
        setCourses(
            courses.filter((course) => {
                return !(course.id === id && course.name === 'bruh');
            })
        );
    };
    return (
        <nav className="fixed top-0 flex min-h-screen w-20 shrink-0 overflow-x-hidden overflow-y-scroll bg-bgsecondary">
            <div className="h-screen flex-auto pt-4">
                <div className="pb-24">
                    <NavIcon to="/" noActive>
                        <div className="absolute top-0 left-0 h-full w-full bg-white" />
                        <Logo className="z-10 w-9/12 text-red-700" />
                    </NavIcon>

                    <Divider isWide />

                    <NavIcon to="/">
                        <Home className="w-5" />
                    </NavIcon>
                    <NavIcon to="/watch-later">
                        <Clock className="w-6" />
                    </NavIcon>
                    <NavIcon to="/search">
                        <Search className="w-6" />
                    </NavIcon>

                    <Divider />

                    <motion.div
                        className="nav-item-wrapper group"
                        layout="position"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
                    >
                        <div
                            onClick={() => {
                                setCourses([...courses, { name: 'bruh', id: Math.random().toString() }]);
                            }}
                            className="relative h-12 w-12 cursor-pointer"
                        >
                            <div
                                className={`relative h-12 w-12 overflow-hidden
                                    rounded-3xl bg-bgtertiary transition-all
                                    duration-200 group-hover:rounded-2xl`}
                                // Move style to its own class
                                style={{ transform: 'translate3d(0, 0, 0)' }}
                            >
                                <div
                                    className="absolute top-0 left-0 flex h-full w-full
                                     items-center justify-center"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <AnimatePresence presenceAffectsLayout>
                        {courses.map(({ name, id }) => (
                            <div key={id} onClick={() => remove(id)}>
                                <NavIcon to={`/course/${id}`}>
                                    <div className="text-sm font-semibold">{name.slice(0, 5)}</div>
                                </NavIcon>
                            </div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="fixed bottom-0 bg-bgsecondary pb-2">
                    <div className="nav-item-wrapper pb-2">
                        <div className="h-[0.125rem] w-20 rounded bg-bgtertiary" />
                    </div>
                    <a
                        className="nav-item-wrapper group"
                        title="Github"
                        href="https://github.com/christiangroothuis/videocollege/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="relative h-12 w-12 cursor-pointer">
                            <div
                                className={`relative h-12 w-12 overflow-hidden
                                rounded-3xl bg-bgtertiary transition-all
                                duration-200 group-hover:rounded-2xl`}
                                // Move style to its own class
                                style={{ transform: 'translate3d(0, 0, 0)' }}
                            >
                                <div
                                    className="absolute top-0 left-0 flex h-full w-full
                                 items-center justify-center"
                                >
                                    <Github className="w-5 text-white" />
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    );
}
