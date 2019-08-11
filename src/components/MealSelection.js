import React, { useContext, useEffect } from "react";
import "./MealSelection.scss";
import Meals from "./Meals";
import YourMeals from "./YourMeals";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import ContinueMessage from "./ContinueMessage";
import cookie from "cookie";
import axios from "axios";

export default function MealSelection() {
	const { progress, updateProgress } = useContext(ProgressContext);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { meals, nights, selectedMealCount } = userData;
	const canContinue = !(nights - selectedMealCount);
	const cookies = cookie.parse(document.cookie);
	const dinner_in_gbiv_customer_id = cookies.dinner_in_gbiv_customer_id;
	// Add a meal to the selected meals list if the list is not full
	const addSelectedMeal = async (index, title, image, price, id) => {
		// Submit the meal to the database
		try {
			const res = await axios.post(
				`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/setmealselections/notloggedin/${dinner_in_gbiv_customer_id}`,
				{
					new_meal_post_id: id
				}
			);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
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
	const removeSelectedMeal = async (index, title, image, price, id) => {
		// Remove the meal from the database
		try {
			const res = await axios.post(
				`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/setmealselections/notloggedin/${dinner_in_gbiv_customer_id}`,
				{
					new_meal_post_id: id
				}
			);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
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
		canContinue && updateProgress(progress + 1);
	};

	return (
		<div className="content meal-selection">
			<h2 className={`header mb-0`}>Select {nights} meals for your next delivery</h2>
			<ContinueMessage continueClick={continueClick} canContinue={canContinue} />
			<YourMeals
				selectedMeals={meals}
				removeSelectedMeal={removeSelectedMeal}
				selectedMealCount={selectedMealCount}
				nights={nights}
				continueClick={continueClick}
			/>
			<Meals addSelectedMeal={addSelectedMeal} type="meals" />
		</div>
	);
}
