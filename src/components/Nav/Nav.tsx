import React from 'react';
import Divider from './Divider';
import NavIcon from './NavIcon';
import ChannelIcon from './ChannelIcon';

import { ReactComponent as Logo } from '../../assets/tue-logo/logo-old.svg';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Clock } from '../../assets/icons/clock.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Github } from '../../assets/icons/github.svg';

// import logoBg from '../../assets/images/christmas.jpg';

import './nav.css';

export function Nav() {
    return (
        <nav className="fixed top-0 flex min-h-screen w-20 shrink-0 bg-bgsecondary">
            <div style={{ overflow: 'hidden scroll' }} className="h-screen flex-auto pt-4">
                <div className="pb-24">
                    <NavIcon to="/" noActive>
                        {/* <img
						className="absolute top-0 left-0 w-full h-full object-cover"
						src={logoBg}
						alt=""
						width="48"
						height="48"
					/> */}
                        {/* <Logo className="w-9/12 z-10" /> */}
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

                    <ChannelIcon to="/course/80ee9f559585422fa33ab82c9c19355a14" text="3IC30 [2021-2022]" />
                    <ChannelIcon to="/course/2011669edf764e00ae385e61eb5b8a4e14" text="2IAB0 [2021-2022]" />
                    <ChannelIcon to="/course/0a19c5499aec4b4a98f5d4a538bf090214" text="2IL50 [2021-2022]" />
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
