import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import axios from "axios";
import "./NightsAndPeople.scss";
import DinRadioButton from "./DinRadioButton";

// This should be creating a browser cookie for the user
const cookie = "aaaaaaaaaa1111111111bbbbbbbbbb23";

export default function NightsAndPeople() {
	const [loaded, updateLoaded] = useState(false);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { nights, people } = userData;
	const nightsValues = [3, 5, 7];
	// 1 person 3 nights not allowed
	const peopleValues = nights === 3 ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];

	// Fetch the nights and people values on mount if they exist
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Get the nights and people for a particular cookie value
				const result = await axios.get(
					`https://proxy.alphabean.co.nz/api/dinnerin/nightsandpeople?cookieid=${cookie}`
				);

				// Parse the result into the nights and people values
				updateUserData(d => {
					return { ...userData, nights: parseInt(result.data.nights), people: parseInt(result.data.people) };
				});

				// Update app to loaded
				updateLoaded(d => {
					return true;
				});
			} catch (err) {
				// If the content doesn't load we must set the nights and people to the default values
				updateUserData(d => {
					return { ...userData, nights: 5, people: 3 };
				});
				updateLoaded(d => {
					return true;
				});
			}
		};
		fetchData();
	}, []);

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
	return loaded ? (
		<div className="content nights-and-people">
			<form onSubmit={onSubmit}>
				<h2>How many meals?</h2>
				<div className="radio-squares nights">
					{nightsValues.map((value, index) => (
						<DinRadioButton
							type="radio"
							key={index}
							name="nights"
							checked={nights === value}
							value={value}
							label={value}
							onChange={updateNights}
						/>
					))}
				</div>
				<h2>For how many people?</h2>
				<div className="radio-squares people">
					{peopleValues.map((value, index) => (
						<DinRadioButton
							type="radio"
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
	) : (
		<div className="content loading">
			<ReactLoading type="cubes" color="#00a651" />
		</div>
	);
}
