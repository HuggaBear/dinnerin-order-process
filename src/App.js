import React from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import UserDataContextProvider from "./contexts/UserDataContext";
import ProgressContextProvider from "./contexts/ProgressContext";
import Header from "./components/Header";
function App() {
	return (
		<main>
			<Header />
			<ProgressContextProvider>
				<ProgressBar />
				<UserDataContextProvider>
					<Content />
				</UserDataContextProvider>
			</ProgressContextProvider>
			<Footer />
		</main>
	);
}
export default App;
