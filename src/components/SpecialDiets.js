import React from "react";

export default function SpecialDiets(props) {
	const { updateProgress, progress } = props;
	return (
		<div>
			<h1>Special Diets</h1>
			<button onClick={() => updateProgress(progress + 1)}>Continue</button>
			<button onClick={() => updateProgress(progress - 1)}>Back</button>
		</div>
	);
}
