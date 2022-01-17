import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
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
					<Route path="/" element={<App />} />
					<Route path="presentation/:id" element={<Presentation />} />
					{/* <Route path="player/:id" element={<Player />} /> */}
				</Routes>
			</Router>
		</SWRConfig>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
