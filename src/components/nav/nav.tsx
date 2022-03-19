import React from "react";
import Divider from "./divider";
import NavIcon from "./navIcon";
import ChannelIcon from "./channelIcon";

import { ReactComponent as Logo } from "../../assets/tue-logo/logo-old.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Github } from "../../assets/icons/github.svg";

// import logoBg from "../../assets/images/christmas.jpg";

const Nav = () => {
	return (
		<nav className="flex shrink-0 w-20 min-h-screen bg-bgsecondary">
			<div
				style={{ overflow: "hidden scroll" }}
				className="flex-auto h-screen pt-4"
			>
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
						<div className="absolute top-0 left-0 w-full h-full bg-white"></div>
						<Logo className="w-9/12 z-10 text-red-700" />
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

					<ChannelIcon
						to="/course/80ee9f559585422fa33ab82c9c19355a14"
						text={"3IC30 [2021-2022]"}
					/>
					<ChannelIcon
						to="/course/2011669edf764e00ae385e61eb5b8a4e14"
						text={"2IAB0 [2021-2022]"}
					/>
					<ChannelIcon
						to="/course/0a19c5499aec4b4a98f5d4a538bf090214"
						text={"2IL50 [2021-2022]"}
					/>
				</div>
				<div className="bottom-0 fixed bg-bgsecondary pb-2">
					<div className="nav-item-wrapper pb-2">
						<div className="h-[0.125rem] w-20 bg-bgtertiary rounded" />
					</div>
					<a
						className={`group nav-item-wrapper`}
						href="https://github.com/christiangroothuis/videocollege/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="relative w-12 h-12 cursor-pointer">
							<div
								className={`bg-bgtertiary relative w-12 h-12
                                transition-all duration-200 overflow-hidden
                                group-hover:rounded-2xl rounded-3xl`}
								style={{ transform: "translate3d(0, 0, 0)" }}
							>
								<div
									className="absolute w-full h-full top-0 left-0 flex
                                 justify-center items-center"
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
};

export default Nav;
