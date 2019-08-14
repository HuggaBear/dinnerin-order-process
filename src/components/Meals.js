import React, { useEffect, useContext, useState } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import { PopupContext } from "../contexts/PopupContext";
import "./Meals.scss";
import axios from "axios";
import Meal from "./Meal";
import MealInfoPopup from "./MealInfoPopup";
import * as Constants from "../constants/Constants";

export default function Meals({ type, addSelectedMeal, buttons = true }) {
	const [data, updateData] = useState({
		// An array of meal objects. These can currently be of type dessert or meal
		[type]: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
		loaded: false,
		err: false
	});

	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress } = useContext(ProgressContext);
	const { popup } = useContext(PopupContext);

	// If the user has selected vegetarian only options, we must first filter the meals (only if not on the desserts page)
	const theMeals = data[type].filter(
		item =>
			!data.loaded || type === "desserts" || (userData.vegetarian ? item.acf.vegetarian : !item.acf.vegetarian)
	);

	// Fetch meal/dessert data on mount. Type can be meals or desserts
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`https://dinnerin.co.nz/wp-json/wp/v2/${type}?per_page=100`);
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
						image={item.acf.meal_image}
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
			{popup.showPopup && (
				<MealInfoPopup
					data={data}
					updateData={updateData}
					type={type}
					addSelectedMeal={addSelectedMeal}
					theMeals={theMeals}
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
								{userData.vegetarian ? "View Standard Menu" : "View Vegetarian Menu"}
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
