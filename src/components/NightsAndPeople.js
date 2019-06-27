import React from "react";
import "./NightsAndPeople.scss";

export default function NightsAndPeople({ updateProgress, progress }) {
	return (
		<div>
			<h1>Nights and People</h1>
			<button onClick={() => updateProgress(progress + 1)}>Continue</button>
			<button onClick={() => updateProgress(progress - 1)}>Back</button>
		</div>
	);
}
