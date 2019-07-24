import React, { useState, useContext, useEffect } from "react";
import ReactLoading from "react-loading";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import axios from "axios";
import "./NightsAndPeople.scss";
import DinRadioButton from "./DinRadioButton";
import cookie from "cookie";
// This should be creating a browser cookie for the user

export default function NightsAndPeople() {
	const [loaded, updateLoaded] = useState(false);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { nights, people } = userData;
	const nightsValues = [3, 5, 7];
	// 1 person 3 nights not allowed
	const peopleValues = nights === 3 ? [2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6];

	// Get the browser cookies as an object containing key value pairs
	var cookies = cookie.parse(document.cookie);

	// Look for dinnerin_order_cookieid
	var dinnerin_order_cookieid = cookies.dinnerin_order_cookieid;

	// Fetch the nights and people values on mount if they exist
	useEffect(() => {
		const fetchData = async () => {
			try {
				// If the cookie is present, i.e this user has visited the site in the last 28 days, request the info for the cookie from the database
				if (dinnerin_order_cookieid) {
					const result = await axios.get(
						`https://proxy.alphabean.co.nz/api/dinnerin/nightsandpeople?cookieid=${dinnerin_order_cookieid}`
					);
					// Parse the result into the nights and people values
					updateUserData(d => {
						return {
							...userData,
							nights: parseInt(result.data.nights),
							people: parseInt(result.data.people)
						};
					});

					// Update app to loaded
					updateLoaded(d => {
						return true;
					});
				} else {
					// Create a cookie for the new user, since it does not exist. The cookie is a random, unique 32 digit hex string
					var date = new Date();
					var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 28);
					document.cookie = `dinnerin_order_cookieid=aaaaaaaaaa1111111111bbbbbbbbbca3; exires=${newDate}`;

					// Set the  nights and people to default values
					updateUserData(d => {
						return { ...userData, nights: 5, people: 3 };
					});
					updateLoaded(d => {
						return true;
					});
				}
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
	const onSubmit = async e => {
		// Create / update the selected nights and people with the cookieid
		// try {
		// 	const result = await axios.post(
		// 		`https://proxy.alphabean.co.nz/api/dinnerin/nightsandpeople?cookieid=${dinnerin_order_cookieid}`,
		// 		{
		// 			num_nights: nights,
		// 			num_people: people
		// 		}
		// 	);

		// } catch (err) {
		// 	console.log(err);
		// }

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
		<>
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
				<p className="more-meals">
					If you would like to order more than 7 meals, please email info@dinnerin.co.nz for more options.
				</p>
			</div>
		</>
	) : (
		<div className="content loading">
			<ReactLoading type="cubes" color="#00a651" />
		</div>
	);
}
