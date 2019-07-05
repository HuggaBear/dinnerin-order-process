import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";

import "./NightsAndPeople.scss";
import DinRadioButton from "./DinRadioButton";

export default function NightsAndPeople() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { nights, people } = userData;
	const nightsValues = [3, 5, 7];
	// 1 person 3 nights not allowed
	const peopleValues = nights === 3 ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];

	const updateNights = e => {
		// 1 person 3 nights not allowed
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
		// Initialise meals with placeholder array that is the same length as nights
		// This also clears selected meals if they already exist
		updateUserData({
			...userData,
			meals: [{}, {}, {}, {}, {}, {}, {}].filter((m, i) => i < nights),
			selectedMealCount: 0
		});
		updateProgress(progress + 1);
		e.preventDefault();
	};
	return (
		<div className="content nights-and-people">
			<form onSubmit={onSubmit}>
				<h2 className="uppercase">How many meals?</h2>
				<div className="radio-squares nights">
					{nightsValues.map((value, index) => (
						<DinRadioButton
							key={index}
							name="nights"
							checked={nights === value}
							value={value}
							label={value}
							onChange={updateNights}
						/>
					))}
				</div>
				<h2 className="uppercase">How many people?</h2>
				<div className="radio-squares people">
					{peopleValues.map((value, index) => (
						<DinRadioButton
							key={index}
							name="people"
							checked={people === value}
							value={value}
							label={value}
							onChange={updatePeople}
						/>
					))}
				</div>
				<button className="uppercase button" type="submit" value="continue">
					Continue
				</button>
			</form>
		</div>
	);
}
