import { Link } from "react-router-dom";
import { dateToText } from "../utils/dateToString";
import { msToHHmmss } from "../utils/msToHHmmss";
import { ProxiedImage } from "./ProxiedImage";

const PresentationPreview = ({
	id,
	title,
	presenter,
	recordDate,
	image,
	duration,
	course,
}: {
	id: string;
	title: string;
	presenter: string;
	recordDate: Date;
	image?: string;
	duration: number;
	course: string;
}) => {
	const HHmmss = msToHHmmss(duration);

	return (
		<Link to={`/presentation/${id}`}>
			<div
				className={`mb-2 aspect-video shadow-2xl rounded overflow-hidden relative blue-gradient`}
			>
				{image && (
					<ProxiedImage
						onError={(e) => {
							(e.target as HTMLImageElement).style.display =
								"none";
						}}
						src={image}
						className="w-full h-full object-cover"
						alt=""
					/>
				)}
				<div className="absolute right-0 bottom-0 bg-black bg-opacity-70 font-medium text-xs px-1 rounded-sm m-2">
					{HHmmss}
				</div>
			</div>
			<div className="flex flex-col">
				<h2 className="font-bold text-[0.9375rem] line-clamp-1 mb-1">
					{title}
				</h2>
				<span className="text-[0.8125rem] font-medium leading-tight text-tertiary">
					{dateToText(recordDate)}
				</span>
			</div>
		</Link>
	);
};

export default PresentationPreview;
