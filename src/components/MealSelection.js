import React, { useState } from "react";
import "./MealSelection.scss";
import AvailableMeals from "./AvailableMeals";
import YourMeals from "./YourMeals";

export default function MealSelection() {
	// Number of default meals must be equal to number of nights
	const [selectedMeals, updateSelectedMeals] = useState([
		{
			title: "?",
			image:
				"https://react.alphabean.co.nz/wp-content/uploads/2019/07/question-mark-png-5a352b58b02c08.4921308315134339447216.jpg"
		},
		{
			title: "?",
			image:
				"https://react.alphabean.co.nz/wp-content/uploads/2019/07/question-mark-png-5a352b58b02c08.4921308315134339447216.jpg"
		},
		{
			title: "?",
			image:
				"https://react.alphabean.co.nz/wp-content/uploads/2019/07/question-mark-png-5a352b58b02c08.4921308315134339447216.jpg"
		},
		{
			title: "?",
			image:
				"https://react.alphabean.co.nz/wp-content/uploads/2019/07/question-mark-png-5a352b58b02c08.4921308315134339447216.jpg"
		},
		{
			title: "?",
			image:
				"https://react.alphabean.co.nz/wp-content/uploads/2019/07/question-mark-png-5a352b58b02c08.4921308315134339447216.jpg"
		}
	]);

	return (
		<div className="meal-selection">
			<h2>Select 3 meals for your next delivery</h2>
			<div className="meal-selection-wrapper">
				<YourMeals selectedMeals={selectedMeals} />
				<AvailableMeals updateSelectedMeals={updateSelectedMeals} />
			</div>
		</div>
	);
}
