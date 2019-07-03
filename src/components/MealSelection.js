import React, { useContext } from "react";
import "./MealSelection.scss";
import AvailableMeals from "./AvailableMeals";
import YourMeals from "./YourMeals";
import { UserDataContext } from "../contexts/UserDataContext";

export default function MealSelection() {
	// Number of default meals must be equal to number of nights
	const { userData, updateUserData } = useContext(UserDataContext);
	const { meals } = userData;
	const updateSelectedMeals = () => {
		updateUserData({ ...userData });
	};

	return (
		<div className="meal-selection">
			<h2>Select 3 meals for your next delivery</h2>
			<div className="meal-selection-wrapper">
				<YourMeals selectedMeals={meals} />
				<AvailableMeals updateSelectedMeals={updateSelectedMeals} />
			</div>
		</div>
	);
}
