import { useParams } from "react-router-dom";
import { Player } from "../components/player";
import { usePresentation } from "../utils/api";

export const Presentation = () => {
	const { id: presentationId } = useParams();

	const {
		data,
		// isLoading,
		// isError,
	} = usePresentation(presentationId || "");

	return (
		<div>
			<h1 className="font-bold text-4xl">Presentation</h1>
			<div className="w-full h-screen">
				{presentationId && (
					<Player
						className="w-full h-full"
						presentationId={presentationId}
					/>
				)}
			</div>
		</div>
	);
};
