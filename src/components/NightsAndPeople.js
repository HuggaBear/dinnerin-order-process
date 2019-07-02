import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";

import "./NightsAndPeople.scss";
import DinRadioButton from "./DinRadioButton";

export default function NightsAndPeople() {
	// Change these to change the values allowed

	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { nights, people } = userData;
	// 1 person 3 nights not allowed
	const nightsValues = [3, 5, 7];
	const peopleValues = nights === 3 ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];

	const updateNights = e => {
		if (people === 1 && parseInt(e.target.value) === 3) {
			updateUserData({ ...userData, people: 2, nights: parseInt(e.target.value) });
		} else {
			updateUserData({ ...userData, nights: parseInt(e.target.value) });
		}
	};

	const updatePeople = e => {
		updateUserData({ ...userData, people: parseInt(e.target.value) });
	};
	const onSubmit = e => {
		updateProgress(progress + 1);
		console.log("Store nights and people in local storage / submit to API");
		e.preventDefault();
	};
	return (
		<form className="nights-and-people" onSubmit={onSubmit}>
			<h2 className="">How many nights?</h2>
			<div className="radio-squares nights">
				{nightsValues.map((value, index) => (
					<DinRadioButton
						key={index}
						name={"nights"}
						checked={nights === value}
						value={value}
						onChange={updateNights}
					/>
				))}
			</div>
			<h2 className="">How many people?</h2>
			<div className="radio-squares people">
				{peopleValues.map((value, index) => (
					<DinRadioButton
						key={index}
						name={"people"}
						checked={people === value}
						value={value}
						onChange={updatePeople}
					/>
				))}
			</div>
			<button className="uppercase button" type="submit" value="continue">
				Continue
			</button>
		</form>
	);
}
