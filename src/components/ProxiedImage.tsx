import React from "react";

export const ProxiedImage = ({
	...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
	const proxyUrl = process.env.REACT_APP_API_URL;

	if (proxyUrl) {
		props.src = props.src?.replace(
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/,
			proxyUrl
		);
	}
	return <img {...props} />;
};
