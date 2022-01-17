import { Link } from "react-router-dom";

const PresentationPreview = ({
	id,
	title,
	presenter,
	date,
	image,
	duration,
	course,
}: {
	id: string;
	title: string;
	presenter: string;
	date: string;
	image?: string;
	duration: number;
	course: string;
}) => {
	const minutes = (duration / 60000).toFixed(2);

	return (
		<Link
			to={`presentation/${id}`}
			className="p-5 bg-primary hover:bg-white hover:bg-opacity-10 transition-colors duration-300 rounded cursor-pointer"
		>
			<div className="bg-green-600 mb-2 aspect-video shadow-2xl rounded overflow-hidden relative">
				<img
					src={image}
					className="w-full h-full object-cover"
					alt=""
				/>
				<div className="absolute right-0 bottom-0 bg-black bg-opacity-80 font-medium text-sm px-1 rounded mb-1 mr-1">
					{minutes}
				</div>
			</div>
			<div className="flex flex-col">
				<h2 className="font-bold text-md line-clamp-1 mb-1">{title}</h2>
				<p className="text-sm font-medium leading-relaxed text-secondary hover:underline">
					{course}
				</p>
				<span className="text-sm font-medium leading-relaxed text-secondary">
					{presenter}
				</span>
			</div>
		</Link>
	);
};

export default PresentationPreview;
