import PresentationPreview from "../components/PresentationThumbnail";
import { Value } from "@/interfaces/Presentations.interface";
import { usePresentationSearch } from "../utils/api";

const Home = () => {
	const {
		data,
		isLoading,
		// isError
	} = usePresentationSearch({
		query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation  AirDateTimeUtc:[202202260000 TO 202401182359] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
		orderBy: "RecordDate asc",
		amountPerPage: 40,
	});
	const { data: data2 } = usePresentationSearch({
		query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation CreatedUtc:[201701180000 TO 201901182359] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True`,
		amountPerPage: 12,
	});
	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<div className="mb-8">
				<h1 className="font-bold text-2xl mb-4">Upcoming lectures</h1>
				<div
					className="grid gap-4 md:gap-x-5 gap-y-6
                                grid-cols-[repeat(auto-fill,minmax(min(16rem,_100%),1fr))]"
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
						}: Value) => (
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
						)
					)}
				</div>
			</div>
			<div className="mb-8">
				<h1 className="font-bold text-2xl mb-4">Last lectures</h1>
				<div
					className="grid gap-4 md:gap-x-5 gap-y-6
                                grid-cols-[repeat(auto-fill,minmax(min(16rem,_100%),1fr))]"
				>
					{data2?.value?.map(
						({
							Id,
							Title,
							PrimaryPresenter,
							RecordDateLocal,
							Duration,
							ThumbnailUrl,
							ParentFolderName,
						}: Value) => (
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
						)
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
