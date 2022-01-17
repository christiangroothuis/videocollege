import useSWR from "swr";

const apiUrl = process.env.REACT_APP_API_URL;
const sfapikey = process.env.REACT_APP_SFAPIKEY;

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
	const res = await fetch(input, init);
	return res.json();
};

export const usePlayCoverInfo = (id: string) => {
	const { data, error } = useSWR(
		[
			`${apiUrl}/Mediasite/PlayerService/PlayerService.svc/json/GetPlayCoverInfo`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json; charset=UTF-8",
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

export const usePlayerOptions = (id: string) => {
	const { data, error } = useSWR(
		[
			`${apiUrl}/Mediasite/PlayerService/PlayerService.svc/json/GetPlayerOptions`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json; charset=UTF-8",
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

export const useSearch = (query: string, page = 1, amountPerPage = 24) => {
	const { data, error } = useSWR(
		[
			`${apiUrl}/Mediasite/api/v1/Presentations?search=${query}&batchSize=${amountPerPage}&startIndex=${
				(page - 1) * amountPerPage
			}&$select=full&searchfields=Title,Description,Captions,Slides,Tags,Presenters,ModuleAssociations,CategoryAssociations&excludeduplicates=True`,
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

export const usePresentation = (id: string) => {
	const { data, error } = useSWR(
		[
			`${apiUrl}/Mediasite/api/v1/Presentations('${id}')?$select=full`,
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
