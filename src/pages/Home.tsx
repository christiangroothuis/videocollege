import { Value } from "../interfaces/Presentations.interface";
import PresentationPreview from "../components/PresentationPreview";
import { useSearch } from "../utils/api";

const Home = () => {
	const {
		data,
		isLoading,
		// isError
	} = useSearch(`"2ip90"`);
	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="App">
			<h1 className="font-bold text-4xl">Home</h1>
			<header className="App-header">
				<div
					className="grid grid-cols-3 gap-4"
					style={{
						gridTemplateColumns:
							"repeat(auto-fill,minmax(min(22rem, 100%),1fr))",
					}}
				>
					{data?.value?.map(
						({
							Id,
							Title,
							PrimaryPresenter,
							RecordDateLocal,
							Duration,
							ThumbnailUrl,
							ParentFolderName,
						}: Value) => {
							return (
								<PresentationPreview
									key={Id}
									id={Id}
									title={Title}
									presenter={PrimaryPresenter}
									recordDate={RecordDateLocal}
									duration={Duration}
									image={ThumbnailUrl!}
									course={ParentFolderName}
								/>
							);
						}
					)}
				</div>
			</header>
		</div>
	);
};

export default Home;
