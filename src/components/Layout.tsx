import React from "react";
import Nav from "./nav/nav";

import "./nav/nav.css";

export const Layout: React.FC = ({
	children,
}: {
	children?: React.ReactNode;
}) => {
	return (
		<div className="flex overflow-hidden relative w-full h-screen">
			<Nav />
			<div
				style={{ overflow: "hidden scroll" }}
				className="grow bg-bgprimary p-5"
			>
				{children}
			</div>
		</div>
	);
};
