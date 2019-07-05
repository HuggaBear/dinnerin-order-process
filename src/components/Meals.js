import React, { useEffect, useContext, useState } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import "./Meals.scss";
import axios from "axios";
import Meal from "./Meal";
import DinRadioButton from "./DinRadioButton";

export default function Meals({ type, addSelectedMeal, buttons = true }) {
	const [data, setData] = useState({
		// Type can either be meals or desserts
		[type]: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
		loaded: false,
		err: false
	});
	const { userData, updateUserData } = useContext(UserDataContext);
	const { vegetarian } = userData;

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`https://react.alphabean.co.nz/wp-json/wp/v2/${type}?per_page=100`);
			setData(d => {
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
				.filter(item => !data.loaded || (vegetarian ? item.acf.vegetarian : true))
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
							onClick={addSelectedMeal}
							price={item.acf.price}
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
				<h3 className="uppercase">Available {type}</h3>
				{buttons && (
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
				)}
			</div>
			{content}
			{errorContent}
		</div>
	);
}
