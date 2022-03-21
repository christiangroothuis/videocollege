import useSWR, { SWRConfiguration, Key, Fetcher } from 'swr';

import { PlayerOptions } from '../interfaces/PlayerOptions.interface';
import { Presentations, Value } from '../interfaces/Presentations.interface';
import { PlayCoverInfo } from '../interfaces/PlayCoverInfo.interface';
import { Home } from '../interfaces/Home.interface';
import { dateToString } from '../helpers/dateToString';

const apiUrl = process.env.REACT_APP_API_URL;
const sfapikey = process.env.REACT_APP_SFAPIKEY;

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, init);

    if ([401, 403].includes(res.status)) {
        window.location.href = `https://videocollege.tue.nl/Mediasite/Login/saml?ReturnUrl=${window.location.href}`;
    }

    if (!res.ok) {
        // throw new Error(res.statusText);
        // let error: Error = new Error(
        // 	"An error occurred while fetching the data."
        // );
        // error.info = await res.json();
        // error.status = res.status;
        throw res;
    }

    return res.json();
};

export const useHome = (config?: SWRConfiguration): { data: Home; isLoading: boolean; isError: boolean } => {
    const { data, error } = useSWR(
        [
            `${apiUrl}/Mediasite/api/v1/Home`,
            {
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    sfapikey,
                },
                credentials: 'include',
            },
        ],
        fetcher,
        config
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const usePresentation = (id: string, select = 'full'): { data: Value; isLoading: boolean; isError: boolean } => {
    const { data, error } = useSWR(
        [
            `${apiUrl}/Mediasite/api/v1/Presentations('${id}')?$select=${select}`,
            {
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    sfapikey,
                },
                credentials: 'include',
            },
        ],
        fetcher
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const usePlayCoverInfo = (id: string): { data: PlayCoverInfo; isLoading: boolean; isError: boolean } => {
    const { data, error } = useSWR(
        [
            `${apiUrl}/Mediasite/PlayerService/PlayerService.svc/json/GetPlayCoverInfo`,
            {
                method: 'POST',
                // TODO in production this should be application/json, but is now text/plain to prevent cors errors
                headers: {
                    'content-type': 'text/plain',
                },
                credentials: 'include',
                body: JSON.stringify({ presentationId: id }),
            },
        ],
        fetcher
    );

    return {
        data: data?.d,
        isLoading: !error && !data,
        isError: error,
    };
};

export const usePlayerOptions = (id: string): { data: PlayerOptions; isLoading: boolean; isError: boolean } => {
    const { data, error } = useSWR(
        [
            `${apiUrl}/Mediasite/PlayerService/PlayerService.svc/json/GetPlayerOptions`,
            {
                // TODO in production this should be application/json, but is now text/plain to prevent cors errors
                method: 'POST',
                headers: {
                    'content-type': 'text/plain',
                },
                credentials: 'include',
                body: JSON.stringify({
                    getPlayerOptionsRequest: {
                        ResourceId: id,
                        QueryString: '?autostart=true&playfrom=0&covertitle=false&cover=false',
                        UseScreenReader: false,
                    },
                }),
            },
        ],
        fetcher
    );

    return {
        data: data?.d,
        isLoading: !error && !data,
        isError: error,
    };
};

interface SearchParams {
    query: string;
    page?: number;
    amountPerPage?: number;
    orderBy?: string;
    select?: string;
    config?: SWRConfiguration;
}

export const usePresentationSearch = ({
    query,
    page = 1,
    amountPerPage = 24,
    orderBy = 'RecordDate desc',
    select = 'card',
    config,
}: SearchParams): {
    data: Presentations;
    isLoading: boolean;
    isError: boolean;
} => {
    const { data, error } = useSWR(
        [
            `${apiUrl}/Mediasite/api/v1/Presentations?search=${query}&batchSize=${amountPerPage}&startIndex=${
                (page - 1) * amountPerPage
            }&$orderby=${orderBy}&$select=${select}&searchfields=Title,Description,Captions,Slides,Tags,Presenters,ModuleAssociations,CategoryAssociations&excludeduplicates=True`,
            {
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    sfapikey,
                },
                credentials: 'include',
            },
        ],
        fetcher,
        config
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const useChannelSearch = ({
    query,
    page = 1,
    amountPerPage = 24,
    orderBy = 'RecordDate desc',
    select = 'full',
    config,
}: SearchParams): {
    data: Presentations;
    isLoading: boolean;
    isError: boolean;
} => {
    const { data, error } = useSWR(
        [
            // `${apiUrl}/Mediasite/api/v1/Presentations?search=${query}&batchSize=${amountPerPage}&startIndex=${
            `${apiUrl}/Mediasite/api/v1/MediasiteChannels?search=2it80&$top=2000&$orderby=LastModified%20desc
				(page - 1) * amountPerPage
			}&$orderby=${orderBy}&$select=${select}&searchfields=Title,Description,Captions,Slides,Tags,Presenters,ModuleAssociations,CategoryAssociations&excludeduplicates=True`,
            {
                headers: {
                    'content-type': 'application/json; charset=UTF-8',
                    sfapikey,
                },
                credentials: 'include',
            },
        ],
        fetcher,
        config
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const useLastPresentations = ({ date, amountPerPage = 12 }: { date: Date; amountPerPage: number }) => {
    const currentTimeString = dateToString(new Date());
    const nextYearString = dateToString(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

    return usePresentationSearch({
        query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation AirDateTimeUtc:[${currentTimeString} TO ${nextYearString}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
        amountPerPage,
    });
};

export const useNextPresentations = ({ date, amountPerPage = 12 }: { date: Date; amountPerPage: number }) => {
    const currentTimeString = dateToString(new Date());
    const nextYearString = dateToString(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

    return usePresentationSearch({
        query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation AirDateTimeUtc:[${currentTimeString} TO ${nextYearString}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
        amountPerPage,
    });
};
