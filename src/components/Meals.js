import React, { useEffect, useContext, useState } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import "./Meals.scss";
import axios from "axios";
import Meal from "./Meal";
import MealInfoPopup from "./MealInfoPopup";

export default function Meals({ type, addSelectedMeal, buttons = true }) {
	const [data, updateData] = useState({
		// An array of meal objects. These can currently be of type dessert or meal
		[type]: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
		loaded: false,
		err: false,
		showPopup: false,
		mealIndex: null
	});
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress } = useContext(ProgressContext);

	// If the user has selected vegetarian only options, we must first filter the meals (only if not on the desserts page)
	const theMeals = data[type].filter(
		item => !data.loaded || type === "desserts" || (userData.vegetarian ? item.acf.vegetarian : true)
	);

	// Used by the next button in MealInfoPopup to go to the next meal
	const nextMeal = () =>
		data.mealIndex < theMeals.length - 1
			? updateData({ ...data, mealIndex: data.mealIndex + 1 })
			: updateData({ ...data, mealIndex: 0 });

	// Used by the prev button in MealInfoPopup to go th the prev meal
	const prevMeal = () =>
		data.mealIndex === 0
			? updateData({ ...data, mealIndex: theMeals.length - 1 })
			: updateData({ ...data, mealIndex: data.mealIndex - 1 });

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`https://react.alphabean.co.nz/wp-json/wp/v2/${type}?per_page=100`);
			updateData(d => {
				return { ...d, [type]: result.data, loaded: true };
			});
		};
		fetchData();
	}, [type]);

	// Decide what content should be rendered
	const errorContent = data.err ? <div>{data.err}</div> : null;
	const content = (
		<>
			{theMeals.map((item, index) =>
				// Display meals if loaded, else display placeholders
				data.loaded ? (
					<Meal
						key={item.id}
						index={index}
						id={item.id}
						className="loaded"
						title={item.acf.title}
						image={item.acf.image}
						showPopup={() => updateData({ ...data, showPopup: true, mealIndex: index })}
						addSelectedMeal={addSelectedMeal}
						price={item.acf.price}
					/>
				) : (
					<Meal key={index} />
				)
			)}
		</>
	);

	return (
		<>
			{data.showPopup && (
				<MealInfoPopup
					data={data}
					updateData={updateData}
					type={type}
					addSelectedMeal={addSelectedMeal}
					nextMeal={nextMeal}
					prevMeal={prevMeal}
				/>
			)}
			<div className="available-meals">
				<div className="header">
					<h3 className="uppercase">{`${
						progress === 2 ? (userData.vegetarian ? "vegetarian" : "standard") : ""
					} ${type
						.split("")
						.slice(0, type.length - 1)
						.join("")} selections`}</h3>
					{buttons && (
						<label className={`uppercase ${userData.vegetarian ? "checked" : ""}`}>
							<input
								type="checkbox"
								name={"vegetarian"}
								value={userData.vegetarian}
								checked={userData.vegetarian}
								onChange={() => updateUserData({ ...userData, vegetarian: !userData.vegetarian })}
							/>
							<span className="checkbox">
								{userData.vegetarian ? "Standard Menu" : "Vegetarian Menu"}
							</span>
						</label>
					)}
				</div>
				{content}
				{errorContent}
			</div>
		</>
	);
}
