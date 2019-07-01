import React from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import Content from "./components/Content";
import UserDataContextProvider from "./contexts/UserDataContext";
import ProgressContextProvider from "./contexts/ProgressContext";
function App() {
	return (
		<main>
			<ProgressContextProvider>
				<ProgressBar />
				<UserDataContextProvider>
					<Content />
				</UserDataContextProvider>
			</ProgressContextProvider>
		</main>
	);
}
export default App;
