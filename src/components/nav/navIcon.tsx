import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

interface Props {
	to: string;
	noActive?: boolean;
	className?: string;
	background?: boolean;
}

const NavIcon: React.FC<Props> = ({
	to,
	background,
	className,
	children,
	noActive = false,
}) => {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	const active = !noActive && match;

	return (
		<NavLink to={to} className={`group nav-item-wrapper ${className}`}>
			<div
				className="absolute top-0 left-0 w-1 h-12
                            flex items-center justify-center"
			>
				<span
					className={`bg-white -translate-x-1 absolute block w-1
                                 rounded-r transition-all duration-200 ${
										!noActive && `group-hover:translate-x-0`
									}
                                 ${
										active
											? `h-10 translate-x-0`
											: `h-2 group-hover:h-5`
									}`}
				></span>
			</div>
			<div className="relative w-12 h-12 cursor-pointer">
				<div
					className={`bg-bgtertiary relative w-12 h-12
                                transition-all duration-200 overflow-hidden
                                group-hover:rounded-2xl
                                ${active ? `rounded-2xl` : `rounded-3xl`}`}
					style={{ transform: "translate3d(0, 0, 0)" }}
				>
					<div
						className={`absolute w-full h-full blue-gradient opacity-0
                                transition-opacity duration-200 top-0 left-0
                                ${!noActive && `group-hover:opacity-100`}
                                ${active ? `opacity-100` : `opacity-0`}`}
					/>
					<div
						className="absolute w-full h-full top-0 left-0 flex
                                 justify-center items-center"
					>
						{children}
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default NavIcon;
