import React from "react";
import { Value } from "@/interfaces/Presentations.interface";
import { dateToString } from "../utils/dateToString";
import { useParams } from "react-router-dom";
import PresentationPreview from "../components/PresentationThumbnail";
import { usePresentationSearch } from "../utils/api";

export const Course = () => {
	const { id: folderId } = useParams();

	const {
		data,
		isLoading,
		// isError
	} = usePresentationSearch({
		// query: `(2IC30 OR 2IAB0 OR 2IL50) Type:Presentation  AirDateTimeUtc:[${dateToString(
		query: `Type:Presentation  AirDateTimeUtc:[${dateToString(
			new Date()
		)} TO ${dateToString(
			new Date(new Date().setFullYear(new Date().getFullYear() + 1))
		)}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True
        AND (ParentFolderId:${folderId})`,
		orderBy: "RecordDate asc",
		amountPerPage: 4,
	});
	const { data: data2 } = usePresentationSearch({
		query: `ParentFolderId:${folderId} Type:Presentation AirDateTimeUtc:[${dateToString(
			new Date(new Date().setFullYear(new Date().getFullYear() - 1))
		)} TO ${dateToString(
			new Date()
		)}] AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True
        AND ParentFolderId:${folderId}`,
		amountPerPage: 12,
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<div className="mb-8">
				<h1 className="font-bold text-2xl mb-4">Upcoming lectures</h1>
				<div
					className="grid gap-4 gap-y-6
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
					className="grid gap-4 gap-y-6
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
