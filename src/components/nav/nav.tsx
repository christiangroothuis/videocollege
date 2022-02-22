import React from "react";
import Divider from "./divider";
import NavIcon from "./navIcon";
import ChannelIcon from "./channelIcon";

import { ReactComponent as Logo } from "../../assets/tue-logo/logo-old.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";

// import logoBg from "../../assets/images/christmas.jpg";

const Nav = () => {
	return (
		<nav className="flex shrink-0 w-20 min-h-screen bg-bgsecondary">
			<div
				style={{ overflow: "hidden scroll" }}
				className="flex-auto h-screen pt-4"
			>
				<NavIcon to="/" isLogo>
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
		</nav>
	);
};

export default Nav;
