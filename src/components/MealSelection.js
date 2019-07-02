import React, { useContext, useState } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
export default function MealSelection() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { vegetarian } = userData;

	const { meals, updateMeals } = useState({
		meals: [],
		isLoaded: false,
		error: false
	});
	return <div>{"" + vegetarian}</div>;
}
