import React, { useContext, useState } from "react";
import "./MealSelection.scss";
import AvailableMeals from "./AvailableMeals";
import YourMeals from "./YourMeals";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import ContinueMessage from "./ContinueMessage";

export default function MealSelection() {
	const [displayError, updateDisplayError] = useState(false);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { meals, nights, selectedMealCount } = userData;
	const canContinue = !(nights - selectedMealCount);

	// Add a meal to the selected meals list if the list is not full
	const addSelectedMeal = (index, title, image) => {
		if (selectedMealCount < nights) {
			updateUserData({
				...userData,
				selectedMealCount: selectedMealCount + 1,
				meals: [
					...meals.slice(0, selectedMealCount),
					{ title, image, selected: true },
					...meals.slice(selectedMealCount + 1)
				]
			});
		}
	};

	// Remove a meal from the selected meals list if the list is not empty
	const removeSelectedMeal = index => {
		if (selectedMealCount > 0) {
			updateUserData({
				...userData,
				selectedMealCount: selectedMealCount - 1,
				meals: [...meals.slice(0, index), ...meals.slice(index + 1), {}]
			});
		}
	};

	// Continue to next step if the user has selected all their meals
	const continueClick = () => {
		canContinue ? updateProgress(progress + 1) : updateDisplayError(true);
	};

	return (
		<div className="content meal-selection">
			<h2 className={`header ${displayError || canContinue ? "mb-0" : ""}`}>
				Select {nights} meals for your next delivery
			</h2>
			{(displayError || canContinue) && (
				<ContinueMessage continueClick={continueClick} displayError={displayError} />
			)}
			<YourMeals
				selectedMeals={meals}
				removeSelectedMeal={removeSelectedMeal}
				selectedMealCount={selectedMealCount}
				nights={nights}
				continueClick={continueClick}
			/>
			<AvailableMeals addSelectedMeal={addSelectedMeal} />
			<div className="footer" />
		</div>
	);
}
