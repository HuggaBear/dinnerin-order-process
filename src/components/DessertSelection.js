import React, { useContext, useState } from "react";
import "./DessertSelection.scss";
import Meals from "./Meals";
import YourDesserts from "./YourDesserts";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import ContinueMessage from "./ContinueMessage";

export default function DessertSelection() {
	const [displayError, updateDisplayError] = useState(false);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { desserts, nights, selectedDessertCount } = userData;
	const canContinue = !(nights - selectedDessertCount);

	// Add a meal to the selected desserts list if the list is not full
	const addSelectedDessert = (index, title, image) => {
		updateUserData({
			...userData,
			selectedDessertCount: selectedDessertCount + 1,
			desserts: [
				...desserts.slice(0, selectedDessertCount),
				{ title, image, selected: true },
				...desserts.slice(selectedDessertCount + 1)
			]
		});
	};

	// Remove a meal from the selected desserts list if the list is not empty
	const removeSelectedDessert = index => {
		updateUserData({
			...userData,
			desserts: [...desserts.slice(0, index), ...desserts.slice(index + 1), {}]
		});
	};

	// Continue to next step if the user has selected all their desserts
	const continueClick = () => {
		canContinue ? updateProgress(progress + 1) : updateDisplayError(true);
	};

	return (
		<div className="content meal-selection">
			<h2 className={`header ${displayError || canContinue ? "mb-0" : ""}`}>
				Select desserts to go with your meal
			</h2>
			{(displayError || canContinue) && (
				<ContinueMessage continueClick={continueClick} displayError={displayError} />
			)}
			<YourDesserts
				selectedDesserts={desserts}
				removeSelectedDessert={removeSelectedDessert}
				continueClick={continueClick}
			/>
			<Meals type="desserts" addSelectedMeal={addSelectedDessert} buttons={false} />
			<div className="footer" />
		</div>
	);
}
