import React, { useContext } from "react";
import "./DessertSelection.scss";
import Meals from "./Meals";
import YourDesserts from "./YourDesserts";
import { UserDataContext } from "../contexts/UserDataContext";

export default function DessertSelection() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { desserts } = userData;
	// Add a meal to the selected desserts list
	const addSelectedDessert = (index, title, image, price) => {
		updateUserData({
			...userData,
			desserts: [...desserts, { title, image, price, selected: true }]
		});
	};

	// Remove a meal from the selected desserts list
	const removeSelectedDessert = index => {
		updateUserData({
			...userData,
			desserts: [...desserts.slice(0, index), ...desserts.slice(index + 1)]
		});
	};
	return (
		<div className="content meal-selection">
			<h2 className="header uppercase">Select desserts to go with your meal</h2>
			<YourDesserts selectedDesserts={desserts} removeSelectedDessert={removeSelectedDessert} />
			<Meals type="desserts" addSelectedMeal={addSelectedDessert} buttons={false} />
			<div className="footer" />
		</div>
	);
}
