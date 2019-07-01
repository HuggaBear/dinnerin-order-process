import React from "react";
import "./App.css";
// import Products from "./components/Products";
// import { Route } from "react-router-dom";
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
			{/* <Route exact path="/no/" component={Products} />*/}
		</main>
	);
}
export default App;
