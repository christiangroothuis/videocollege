import { useRef } from "react";
import { Link } from "react-router-dom";
import { dateToLocaleDateString } from "../utils/dateToLocaleDateString";
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

	const colors = [
		"#D9184B",
		"#023E73",
		"#0AADBF",
		"#97BF41",
		"#F27218",
		"#DB5220",
		"#E81729",
	];
	// const colors = ["#E88C17", "#F27218", "#DB5220", "#F23318", "#E81729"];
	// const colors = ["#9C2C00", "#FF5B19", "#E84200", "#009C82", "#00E8C1"];

	const color: any = useRef(
		colors[Math.floor(Math.random() * (colors.length - 1))]
	);

	return (
		<Link
			to={`/presentation/${id}`}
			className="p-5 bg-primary hover:bg-white hover:bg-opacity-10 transition-colors duration-300 rounded cursor-pointer"
		>
			<div
				className={`mb-2 aspect-video shadow-2xl rounded overflow-hidden relative`}
				style={{ backgroundColor: color.current }}
			>
				{/* {image && (
					<ProxiedImage
						src={image}
						className="w-full h-full object-cover"
						alt=""
					/>
				)} */}
				<div className="absolute right-0 bottom-0 bg-black bg-opacity-80 font-medium text-[.8rem] px-1 rounded-sm m-1">
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
