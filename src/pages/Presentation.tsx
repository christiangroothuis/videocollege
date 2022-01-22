import { dateToLocaleDateString } from "../utils/dateToLocaleDateString";
import { useParams } from "react-router-dom";
import { Player } from "../components/player";
import { usePresentation } from "../utils/api";

export const Presentation = () => {
	const { id: presentationId } = useParams();

	const { data, isLoading, isError } = usePresentation(presentationId!);

	if (!isLoading && !isError) {
		const { Title, RecordDateLocal, NumberOfViews, PrimaryPresenter } =
			data;

		return (
			<div>
				<h1 className="font-bold text-4xl">Presentation</h1>
				{presentationId && (
					<Player
						className="w-full aspect-video min-h-[40rem] max-h-[80vh]"
						presentationId={presentationId}
					/>
				)}
				<h1>{Title}</h1>
				<span>{dateToLocaleDateString(RecordDateLocal)}</span>
				<span>{PrimaryPresenter}</span>
				<span>{NumberOfViews}</span>
			</div>
		);
	}

	return <div>Loading...</div>;
};
