import React from "react";
import Divider from "./divider";
import NavIcon from "./navIcon";
import ChannelIcon from "./channelIcon";

import { ReactComponent as Logo } from "../../assets/tue-logo/logo-old.svg";
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Clock } from "../../assets/icons/clock.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";

import logoBg from "../../assets/images/christmas.jpg";

const Nav = () => {
	return (
		<nav className="flex shrink-0 w-20 min-h-screen bg-bgsecondary">
			<div
				style={{ overflow: "hidden scroll" }}
				className="flex-auto h-screen pt-4"
			>
				<NavIcon to="/" isLogo>
					<img
						className="absolute top-0 left-0 w-full h-full object-cover"
						src={logoBg}
						alt=""
						width="48"
						height="48"
					/>
					<Logo className="w-9/12 z-10 " />
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

				<ChannelIcon to="/2it80" text={"2IT80 [2021-2022]"} />
				<ChannelIcon to="/3nab0" text={"3NAB0 [2021-2022]"} />
				<ChannelIcon to="/2IP90" text={"2IP90 [2021-2022]"} />
			</div>
		</nav>
	);
};

export default Nav;
