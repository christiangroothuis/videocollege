import { Link } from "react-router-dom";
import { dateToLocaleDateString } from "../utils/dateToLocaleDateString";
import { msToHHmmss } from "../utils/msToHHmmss";

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
		<Link
			to={`presentation/${id}`}
			className="p-5 bg-primary hover:bg-white hover:bg-opacity-10 transition-colors duration-300 rounded cursor-pointer"
		>
			<div
				className={`${
					image ? "bg-green-600" : "bg-red-500"
				} mb-2 aspect-video shadow-2xl rounded overflow-hidden relative`}
			>
				{image && (
					<img
						src={image}
						className="w-full h-full object-cover"
						alt=""
					/>
				)}
				<div className="absolute right-0 bottom-0 bg-black bg-opacity-80 font-medium text-[.8rem] px-1 rounded-sm m-2">
					{HHmmss}
				</div>
			</div>
			<div className="flex flex-col">
				<h2 className="font-bold text-md line-clamp-1 mb-1">{title}</h2>
				<p className="text-sm font-medium leading-relaxed text-secondary hover:underline">
					{course}
				</p>
				<span className="text-sm font-medium leading-relaxed text-secondary">
					{dateToLocaleDateString(recordDate)}
				</span>
			</div>
		</Link>
	);
};

export default PresentationPreview;
