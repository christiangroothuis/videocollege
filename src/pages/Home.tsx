import { Value } from "../interfaces/Presentations.interface";
import PresentationPreview from "../components/PresentationThumbnail";
import { useSearch } from "../utils/api";

const Home = () => {
	const { data, isLoading, isError } = useSearch({
		query: `3NAB0-BDS_BCS_BPT_BSI  Type:Presentation CreatedUtc:[201701180000 TO 201901182359] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
		orderBy: "RecordDate asc",
	});
	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="p-10">
			<h1 className="font-bold text-4xl">Home</h1>
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
								image={ThumbnailUrl || undefined}
								course={ParentFolderName}
							/>
						);
					}
				)}
			</div>
		</div>
	);
};

export default Home;
