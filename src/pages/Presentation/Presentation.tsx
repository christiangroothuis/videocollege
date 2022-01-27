import { dateToString } from "../../utils/dateToString";
import { useParams } from "react-router-dom";
import { usePresentation } from "../../utils/api";
import { PlayerWrapper } from "../../components/player/playerWrapper";

import "./presentation.css";

export const Presentation = () => {
	const { id: presentationId } = useParams();
	const { data, isLoading, isError } = usePresentation(presentationId!);

	if (isError) {
		return <div>Error. Try reloading the page</div>;
	}

	let description = <div>Loading...</div>;

	if (!isLoading) {
		const { Title, RecordDateLocal, NumberOfViews, PrimaryPresenter } =
			data;

		description = (
			<div>
				<span className="font-bold text-2xl mb-2">{Title}</span>
				<div className="text-secondary flex flex-col space-y-4">
					<span>{NumberOfViews} Views</span>
					<span>Recorded on {dateToString(RecordDateLocal)}</span>
					<span>{PrimaryPresenter}</span>
				</div>
			</div>
		);
	}

	return (
		<div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
			<div className="overflow-hidden ">
				<div className="w-full aspect-video min-h-[60vh] xl:h-[75vh] max-w-full rounded-2xl bg-black relative overflow-hidden">
					<PlayerWrapper
						className="w-full h-full absolute left-0 top-0"
						presentationId={presentationId!}
					/>
				</div>
				<div className="p-8 pt-7 min-h-[12rem] bg-bgsecondary mt-3 rounded-2xl">
					{description}
				</div>
			</div>
			<div>
				<h1 className="font-bold text-xl py-3">Upcoming lectures</h1>
				<div className="grid grid-cols-1 gap-2">
					<SmallThumbnail />
					<SmallThumbnail />
					<SmallThumbnail />
					<SmallThumbnail />
				</div>
			</div>
		</div>
	);
};

const SmallThumbnail = () => {
	return (
		<div className="h-18 bg-bgsecondary p-2.5 rounded-xl flex items-center">
			<div className="aspect-square h-full blue-gradient rounded-md mr-3"></div>
			<div className="grow">
				<div className="font-semibold line-clamp-1">
					2IAB0 [2022-02-07 - 17:30]
				</div>
				<div className="text-tertiary text-md text-sm">
					2/7/2022 17:30
				</div>
			</div>
			<div className="text-tertiary font-medium text-sm">45:19</div>
		</div>
	);
};
