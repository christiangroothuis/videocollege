interface Props {
	isWide?: boolean;
}

const Divider = ({ isWide = false }: Props) => {
	return (
		<div className={`nav-item-wrapper py-2`}>
			<div
				className={`h-[0.125rem] ${
					isWide ? "w-20" : "w-8"
				} bg-bgtertiary rounded`}
			></div>
		</div>
	);
};

export default Divider;
