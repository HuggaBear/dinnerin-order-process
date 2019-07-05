import React, { useEffect, useContext, useState } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import "./Meals.scss";
import axios from "axios";
import Meal from "./Meal";
import MealInfoPopup from "./MealInfoPopup";

export default function Meals({ type, addSelectedMeal, buttons = true }) {
	const [data, updateData] = useState({
		// Type can either be meals or desserts
		[type]: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
		loaded: false,
		err: false,
		showPopup: false,
		mealId: null
	});
	const { userData, updateUserData } = useContext(UserDataContext);

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
			{data[type]
				// Filter vegetarian options if loaded and vegeterian only is selected
				.filter(item => !data.loaded || (userData.vegetarian ? item.acf.vegetarian : true))
				.map((item, index) =>
					// Display meals if loaded, else display placeholders
					data.loaded ? (
						<Meal
							key={item.id}
							index={index}
							id={item.id}
							className="loaded"
							title={item.acf.title}
							image={item.acf.image}
							onClick={() => updateData({ ...data, showPopup: true, mealIndex: index })}
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
				<MealInfoPopup data={data} updateData={updateData} type={type} addSelectedMeal={addSelectedMeal} />
			)}
			<div className="available-meals">
				<div className="header">
					<h3 className="uppercase">Available {type}</h3>
					{buttons && (
						<label className={`uppercase ${userData.vegetarian ? "checked" : ""}`}>
							<input
								type="checkbox"
								name={"vegetarian"}
								value={userData.vegetarian}
								checked={userData.vegetarian}
								onChange={() => updateUserData({ ...userData, vegetarian: !userData.vegetarian })}
							/>
							<span className="checkbox" />
							<span className="checkbox-label">Vegetarian Menu</span>
						</label>
					)}
				</div>
				{content}
				{errorContent}
			</div>
		</>
	);
}
