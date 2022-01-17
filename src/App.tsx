import axios from "axios";
import { useEffect, useState } from "react";
import PresentationPreview from "./PresentationPreview";

function App() {
	// const { data, error } = useSWR('http://localhost:8080/proxy/Mediasite/api/v1/Presentations?search=2IT80 AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True &searchtype=Presentation&batchSize=49&startIndex=0&$select=full&searchfields=Title,Description,Captions,Slides,Tags,Presenters,ModuleAssociations,CategoryAssociations&excludeduplicates=True&searchcachekey=275f1671-2074-47a6-86a3-021906eed853', fetcher)
	const [data, setdata] = useState<any>({});
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"http://localhost:8080/proxy/Mediasite/api/v1/Presentations?search=3nab0 AND (Status:Viewable OR Status:Live OR (Status:Record AND IsLiveEnabled:True) OR (Status:OpenForRecord AND IsLiveEnabled:True)) AND IsApproved:True &searchtype=Presentation&batchSize=49&startIndex=0&$select=full&searchfields=Title,Description,Captions,Slides,Tags,Presenters,ModuleAssociations,CategoryAssociations&excludeduplicates=True&searchcachekey=275f1671-2074-47a6-86a3-021906eed853",
				{
					headers: {
						sfapikey: "2f2627ed-3a97-43aa-ac77-92f227888835",
					},
					withCredentials: true,
				}
			);

			setdata(response.data);
		};
		fetchData();
		return () => {};
	}, []);

	return (
		<div className="App">
			<h1 className="font-bold text-4xl">Home</h1>
			<header className="App-header">
				<div className="grid grid-cols-3 gap-4">
					{data?.value?.map(
						({
							Id,
							Title,
							PrimaryPresenter,
							RecordDateLocal,
							Duration,
							ThumbnailUrl,
							ParentFolderName,
						}: any) => {
							return (
								<PresentationPreview
									id={Id}
									title={Title}
									presenter={PrimaryPresenter}
									date={RecordDateLocal}
									duration={Duration}
									image={ThumbnailUrl}
									course={ParentFolderName}
								/>
							);
						}
					)}
				</div>
				{/* <Player /> */}
			</header>
		</div>
	);
}

export default App;
