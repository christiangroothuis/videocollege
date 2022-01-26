import React from "react";
import NavIcon from "./navIcon";

interface Props {
	to: string;
	text: string;
}
const ChannelIcon = React.memo(({ to, text }: Props) => {
	return (
		<NavIcon to={to}>
			<div className="text-secondary text-sm font-medium">
				{text.slice(0, 5)}
			</div>
		</NavIcon>
	);
});

export default ChannelIcon;
