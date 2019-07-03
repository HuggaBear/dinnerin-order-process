import React, { useEffect, useState, useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import "./AvailableMeals.scss";
import axios from "axios";
import Meal from "./Meal";
import DinRadioButton from "./DinRadioButton";

export default function AvailableMeals({ addSelectedMeal }) {
	// Placeholder meal data
	const [mealData, updateMealData] = useState({
		meals: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
		loaded: false,
		err: false
	});
	const { meals, loaded, err } = mealData;
	const { userData, updateUserData } = useContext(UserDataContext);
	const { vegetarian } = userData;

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get("https://react.alphabean.co.nz/wp-json/wp/v2/meals?per_page=100");
				updateMealData({ meals: res.data, loaded: true });
			} catch (err) {
				console.log(err);
				updateMealData({ err });
			}
		})();
	}, []);

	// Decide what content should be rendered
	const errorContent = err ? <div>{err}</div> : null;
	const content = (
		<>
			{meals
				.filter(meal => !loaded || (vegetarian ? meal.acf.vegetarian : true))
				.map((meal, index) =>
					loaded ? (
						<Meal
							key={index}
							className="loaded"
							title={meal.acf.title}
							image={meal.acf.image}
							onClick={addSelectedMeal}
						/>
					) : (
						<Meal key={index} />
					)
				)}
		</>
	);

	return (
		<div className="available-meals">
			<div className="header">
				<h3 className="uppercase">Available meal options</h3>
				<form>
					<DinRadioButton
						name="vegetarian"
						checked={!vegetarian}
						value={false}
						label="Standard Meals"
						onChange={() => updateUserData({ ...userData, vegetarian: false })}
						extraClasses="uppercase button-small"
					/>
					<DinRadioButton
						name="vegetarian"
						checked={vegetarian}
						value={true}
						label="Vegetarian meals"
						onChange={() => updateUserData({ ...userData, vegetarian: true })}
						extraClasses="uppercase button-small"
					/>
				</form>
			</div>
			{content}
			{errorContent}
		</div>
	);
}
