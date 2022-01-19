import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Presentation } from "./pages/Presentation";
import { SWRConfig } from "swr";

ReactDOM.render(
	<React.StrictMode>
		<SWRConfig
			value={{
				refreshInterval: 0,
				revalidateOnFocus: false,
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
			}}
		>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="presentation/:id" element={<Presentation />} />
					{/* <Route path="player/:id" element={<Player />} /> */}
				</Routes>
			</Router>
		</SWRConfig>
	</React.StrictMode>,
	document.getElementById("root")
);
