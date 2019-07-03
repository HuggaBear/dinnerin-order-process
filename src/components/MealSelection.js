import React, { useContext, useState } from "react";
import "./MealSelection.scss";
import AvailableMeals from "./AvailableMeals";
import YourMeals from "./YourMeals";
import { UserDataContext } from "../contexts/UserDataContext";

export default function MealSelection() {
	// Keep track of how many meals the user has selected. This must match number of nights to allow continuing to the next step
	const [selectedMealCount, updateSelectedMealCount] = useState(0);

	const { userData, updateUserData } = useContext(UserDataContext);
	const { meals, nights } = userData;
	const canContinue = !(nights - selectedMealCount);
	// Add a meal to the selected meals list
	const addSelectedMeal = (index, title, image) => {
		if (selectedMealCount < nights) {
			updateUserData({
				...userData,
				meals: [
					...meals.slice(0, selectedMealCount),
					{ title, image, selected: true },
					...meals.slice(selectedMealCount + 1)
				]
			});
			updateSelectedMealCount(selectedMealCount + 1);
		}
	};

	// Remove a meal from the selected meals list
	const removeSelectedMeal = index => {
		if (selectedMealCount > 0) {
			updateUserData({ ...userData, meals: [...meals.slice(0, index), ...meals.slice(index + 1), {}] });
			updateSelectedMealCount(selectedMealCount - 1);
		}
	};

	return (
		<div className="meal-selection">
			<h2>Select {nights} meals for your next delivery</h2>
			<div className="error-message">
				Please select {nights - selectedMealCount} more meal{nights - selectedMealCount > 1 && "s"}
			</div>
			<div className="meal-selection-wrapper">
				<YourMeals
					selectedMeals={meals}
					removeSelectedMeal={removeSelectedMeal}
					selectedMealCount={selectedMealCount}
					nights={nights}
				/>
				<AvailableMeals addSelectedMeal={addSelectedMeal} />
			</div>
		</div>
	);
}
