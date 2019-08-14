import React, { useState, useContext } from "react";
import "./MealSelection.scss";
import Meals from "./Meals";
import YourMeals from "./YourMeals";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import ContinueMessage from "./ContinueMessage";
import cookie from "cookie";
import axios from "axios";
import ReactLoading from "react-loading";
import * as Constants from "../constants/Constants";

export default function MealSelection() {
	const [loaded, setLoaded] = useState(true);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { meals, nights, selectedMealCount } = userData;
	const canContinue = !(nights - selectedMealCount);
	const cookies = cookie.parse(document.cookie);
	const dinner_in_gbiv_customer_id = cookies.dinner_in_gbiv_customer_id;

	// Add a meal to the selected meals list if the list is not full
	const addSelectedMeal = async (index, title, image, price, id) => {
		if (selectedMealCount < nights) {
			updateUserData({
				...userData,
				selectedMealCount: selectedMealCount + 1,
				meals: [
					...meals.slice(0, selectedMealCount),
					{ title, image, selected: true, id },
					...meals.slice(selectedMealCount + 1)
				]
			});
		}
	};

	// Check database for previously selected meals. If they exist, load them into meals.
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			if (dinner_in_gbiv_customer_id) {
	// 				const result = await axios.get(
	// 					`https://proxy.alphabean.co.nz/api/dinnerin/meals?cookieid=${dinner_in_gbiv_customer_id}`
	// 				);
	// 			}
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

	// Remove a meal from the selected meals list if the list is not empty
	const removeSelectedMeal = async (index, title, image, price, id) => {
		if (selectedMealCount > 0) {
			updateUserData({
				...userData,
				selectedMealCount: selectedMealCount - 1,
				meals: [...meals.slice(0, index), ...meals.slice(index + 1), {}]
			});
		}
	};

	// Add all meals to the database and continue to the next step
	const continueClick = async () => {
		if (canContinue) {
			try {
				setLoaded(false);

				// Purge all previous meal selections
				await axios.delete(
					`${
						Constants.BASE_URL_DIRECT
					}/wp-json/dinnerinquasicart/v2/quasicart/setmealselections/notloggedin/${dinner_in_gbiv_customer_id}`
				);

				// Add all the new meals to the database (synchronous)
				for (let i = 0; i < meals.length; i++) {
					await axios.post(
						`${
							Constants.BASE_URL_DIRECT
						}/wp-json/dinnerinquasicart/v2/quasicart/setmealselections/notloggedin/${dinner_in_gbiv_customer_id}`,
						{
							new_meal_post_id: meals[i].id
						}
					);
				}

				// // Add all the new meals to the database (simultaneous - cannot be implements because no database locking)
				// await axios.all(
				// 	meals.map(async meal => {
				// 		await axios.post(
				// 			`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/setmealselections/notloggedin/${dinner_in_gbiv_customer_id}`,
				// 			{
				// 				new_meal_post_id: meal.id
				// 			}
				// 		);
				// 		console.log("done");
				// 	})
				// );
				updateProgress(progress + 1);
			} catch (err) {
				console.log(err);
				setLoaded(true);
			}
		}
	};

	return loaded ? (
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
	) : (
		<div className="content loading">
			<ReactLoading type="cubes" color="#00a651" />
		</div>
	);
}
