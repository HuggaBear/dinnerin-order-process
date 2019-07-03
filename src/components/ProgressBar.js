import React, { useContext } from "react";
import { ProgressContext } from "../contexts/ProgressContext";
import "./ProgressBar.scss";
export default function ProgressBar() {
	const { progress, updateProgress } = useContext(ProgressContext);

	// All possible application states. Should be in sync with the components in Content.js
	const steps = [
		"Nights & People",
		"Special Diets",
		"Meal Selection",
		"Side Selection",
		"Plan Selection",
		"Checkout"
	];

	//DEBUG - Start app on meal selection REMOVE
	// updateProgress(2);

	return (
		<div className="progress-bar uppercase">
			<ol className="steps">
				{steps.map((item, index) => (
					<li
						key={index}
						className={`step ${progress > index ? "complete" : ""} ${progress === index ? "current" : ""}`}
						onClick={() => (index < progress ? updateProgress(index) : null)}
					>
						{item}
					</li>
				))}
			</ol>
		</div>
	);
}
