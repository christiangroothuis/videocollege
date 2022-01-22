import useSWR from "swr";

import { PlayerOptions } from "@/interfaces/PlayerOptions.interface";
import { Presentations, Value } from "@/interfaces/Presentations.interface";

const apiUrl = process.env.REACT_APP_API_URL;
const sfapikey = process.env.REACT_APP_SFAPIKEY;

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
	const res = await fetch(input, init);

	if ([401, 403].indexOf(res.status) !== -1) {
		window.location.href = `https://videocollege.tue.nl/Mediasite/Login/saml?ReturnUrl=${window.location.href}`;
	}

	return res.json();
};

export const usePlayCoverInfo = (id: string) => {
	const { data, error } = useSWR(
		[
			`${apiUrl}/Mediasite/PlayerService/PlayerService.svc/json/GetPlayCoverInfo`,
			{
				method: "POST",
				headers: {
					"content-type": "text/plain",
				},
				credentials: "include",
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

export const usePlayerOptions = (
	id: string
): { data: PlayerOptions; isLoading: boolean; isError: boolean } => {
	const { data, error } = useSWR(
		[
			`${apiUrl}/Mediasite/PlayerService/PlayerService.svc/json/GetPlayerOptions`,
			{
				method: "POST",
				headers: {
					"content-type": "text/plain",
				},
				credentials: "include",
				body: JSON.stringify({
					getPlayerOptionsRequest: {
						ResourceId: id,
						QueryString:
							"?autostart=true&playfrom=0&covertitle=false&cover=false",
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
}

export const useSearch = ({
	query,
	page = 1,
	amountPerPage = 24,
	orderBy = "RecordDate desc",
	select = "full",
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
					"content-type": "application/json; charset=UTF-8",
					sfapikey,
				},
				credentials: "include",
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

export const usePresentation = (
	id: string,
	select = "full"
): { data: Value; isLoading: boolean; isError: boolean } => {
	const { data, error } = useSWR(
		[
			`${apiUrl}/Mediasite/api/v1/Presentations('${id}')?$select=${select}`,
			{
				headers: {
					"content-type": "application/json; charset=UTF-8",
					sfapikey,
				},
				credentials: "include",
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
