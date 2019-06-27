import React, { useState } from "react";
import "./App.css";
import Products from "./components/Products";
import { Route } from "react-router-dom";
import ProgressBar from "./components/ProgressBar";
import NightsAndPeople from "./components/NightsAndPeople";
import SpecialDiets from "./components/SpecialDiets";

function App() {
	const [progress, updateProgress] = useState(0);
	let content;
	switch (progress) {
		case 0:
			content = <NightsAndPeople progress={progress} updateProgress={updateProgress} />;
			break;
		case 1:
			content = <SpecialDiets progress={progress} updateProgress={updateProgress} />;
			break;
		default:
			content = <NightsAndPeople progress={progress} updateProgress={updateProgress} />;
	}
	return (
		<div className="App">
			<ProgressBar />
			{content}

			<main>
				<Route exact path="/" component={Products} />
			</main>
		</div>
	);
}
export default App;
