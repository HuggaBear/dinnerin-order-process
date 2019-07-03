import React, { useContext } from "react";
import "./MealSelection.scss";
import AvailableMeals from "./AvailableMeals";
import YourMeals from "./YourMeals";
import { UserDataContext } from "../contexts/UserDataContext";

export default function MealSelection() {
	// Number of default meals must be equal to number of nights
	const { userData, updateUserData } = useContext(UserDataContext);
	const { meals } = userData;

	const addSelectedMeal = (title, image) => {
		let newMeals;
		for (let i = 0; i < meals.length; i++) {
			// If the meal is a placeholder, replace it with the new selected meal
			if (!meals[i].title) {
				newMeals = [...meals.slice(0, i), { title: title, image: image }, ...meals.slice(i + 1)];
				break;
			}
		}
		updateUserData({ ...userData, meals: newMeals });
	};
	const removeSelectedMeal = () => {
		updateUserData({ ...userData });
	};

	return (
		<div className="meal-selection">
			<h2>Select 3 meals for your next delivery</h2>
			<div className="meal-selection-wrapper">
				<YourMeals selectedMeals={meals} removeSelectedMeal={removeSelectedMeal} />
				<AvailableMeals addSelectedMeal={addSelectedMeal} />
			</div>
		</div>
	);
}
