import React, { useContext, useState, useEffect } from "react";
import { ProgressContext } from "../contexts/ProgressContext";
import "./ProgressBar.scss";
import Flickity from "react-flickity-component";

export default function ProgressBar() {
	const [flkty, setFlkty] = useState(null);
	const { progress, updateProgress } = useContext(ProgressContext);

	// All possible application states. Should be in sync with the components in Content.js
	const steps = ["Meals & People", "Special Diets", "Meal Selection", "Dessert Selection", "Your Order", "Checkout"];

	useEffect(() => {
		flkty && flkty.select(progress);
	}, [progress, flkty]);

	//DEBUG - Start app on meal selection REMOVE
	// updateProgress(3);

	return (
		<div className="progress-bar-wrapper">
			<div className="progress-bar uppercase custom-flickity-slider">
				<Flickity
					options={{
						// disable previous & next buttons and dots
						prevNextButtons: false,
						pageDots: false,
						dragThreshold: 10,
						freeScroll: true,
						cellAlign: "center"
					}}
					flickityRef={c => setFlkty(c)}
				>
					{steps.map((item, index) => (
						<div
							key={index}
							className={`step ${progress > index ? "complete" : ""} ${
								progress === index ? "current" : ""
							}`}
							onClick={() => (index < progress ? updateProgress(index) : null)}
						>
							{item}
						</div>
					))}
				</Flickity>
			</div>
			<div className="progress-bar uppercase static-progress-bar">
				{steps.map((item, index) => (
					<div
						key={index}
						className={`step ${progress > index ? "complete" : ""} ${progress === index ? "current" : ""}`}
						onClick={() => (index < progress ? updateProgress(index) : null)}
					>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}
