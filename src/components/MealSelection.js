import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserDataContext } from "../contexts/UserDataContext";
import { async } from "q";
export default function MealSelection() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const [data, updateData] = useState({
		meals: [],
		loaded: false
	});
	const { vegetarian } = userData;
	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get("https://react.alphabean.co.nz/wp-json/wp/v2/meals?per_page=6");
				updateData({ meals: res.data, loaded: true });
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	return data.loaded ? (
		<div className="meals">
			{data.meals.map((item, index) => (
				<div key={index}>{item.acf.title}</div>
			))}
		</div>
	) : (
		<div>Loading...</div>
	);
}
