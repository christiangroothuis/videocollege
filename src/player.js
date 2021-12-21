import React from 'react'
import ReactHlsPlayer from "react-hls-player";

export const Player = () => {
    return (
        <div>
            <ReactHlsPlayer
                src="https://ams-hstb-ims-live01.mediasite.com/MediasiteDeliver/Live/00e1db87-0519-45fb-912b-ef043d9a11f4.isml/manifest(format=m3u8-aapl-isoff,segmentLength=6)?playbackTicket=2f7e12a69556404a8dbc5dbe97327ffe&site=videocollege.tue.nl"
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
            />
        </div>
    )
}
