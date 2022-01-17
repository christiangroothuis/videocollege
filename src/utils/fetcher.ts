import useSWR from "swr";

const apiUrl = process.env.REACT_APP_API_URL;

const fetcher = async (
	input: RequestInfo,
	init?: RequestInit,
	...args: any[]
) => {
	const res = await fetch(input, init);
	return res.json();
};

export const usePlayCoverInfo = (id?: string) => {
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

export const usePlayerOptions = (id?: string) => {
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
