import React, { useContext } from "react";
import { ProgressContext } from "../contexts/ProgressContext";
import "./FourOhFour.scss";
export default function _404() {
	const { updateProgress } = useContext(ProgressContext);
	return (
		<div className="text-center four-oh-four">
			<h2>It appears you are lost. Get back on track</h2>
			<button className="uppercase button" onClick={() => updateProgress(0)}>
				Back
			</button>
		</div>
	);
}
