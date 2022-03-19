import React from 'react';

export function ProxiedImage({ alt = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    const proxyUrl = process.env.REACT_APP_API_URL;

    let { src } = props;

    if (proxyUrl) {
        src = src?.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/, proxyUrl);
    }

    /* eslint-disable react/jsx-props-no-spreading */
    return <img alt={alt} src={src} {...props} />;
}
