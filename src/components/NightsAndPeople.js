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
	const cookies = cookie.parse(document.cookie);

	// Look for dinnerin_order_cookieid
	const dinner_in_gbiv_customer_id = cookies.dinner_in_gbiv_customer_id;

	// If there's a cookie, fetch the nights and peopel from the database.
	// If there's no cookie, create one and set nights and people to the default values
	useEffect(() => {
		const fetchData = async () => {
			try {
				// If the cookie is present, i.e this user has visited the site in the last 28 days, request the nights and people from the DB
				if (dinner_in_gbiv_customer_id) {
					// Check if cookie is kosher
					// TODO

					const result = await axios.get(
						`https://proxy.alphabean.co.nz/api/dinnerin/nightsandpeople?cookieid=${dinner_in_gbiv_customer_id}`
					);
					if (result.data.nights && result.data.people) {
						// Parse the result into the nights and people values
						updateUserData(d => {
							return {
								...userData,
								nights: parseInt(result.data.nights),
								people: parseInt(result.data.people)
							};
						});
					}

					// Update app to loaded
					updateLoaded(d => {
						return true;
					});
				} else {
					// Get a new cookie value (32 digit hex string)
					const result = await axios.get(
						`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/getcookievalue`
					);
					// Expires in a month
					const now = new Date();
					now.setMonth(now.getMonth() + 1);
					// Save the cookie
					document.cookie = `dinner_in_gbiv_customer_id=${
						result.data.REST_cookie_value
					};expires=${now.toUTCString()}`;
					// Set the  nights and people to default values
					updateUserData(d => {
						return { ...userData, nights: 5, people: 3 };
					});
					updateLoaded(d => {
						return true;
					});
				}
			} catch (err) {
				console.log(err);
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
		e.preventDefault();
		updateLoaded(false);
		// Create / update the selected nights and people with the cookieid
		try {
			await axios.post(
				`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/setpeopleandnights/notloggedin/${dinner_in_gbiv_customer_id}`,
				{
					num_nights: nights,
					num_people: people
				}
			);
			updateUserData({
				...userData,
				meals: [{}, {}, {}, {}, {}, {}, {}].filter((m, i) => i < nights),
				selectedMealCount: 0
			});
			updateProgress(progress + 1);
		} catch (err) {
			console.log(err);
			updateLoaded(true);
		}

		// Initialise meals with placeholder array that is the same length as nights
		// This also clears selected meals if they already exist
	};
	return loaded ? (
		<>
			<div className="content nights-and-people">
				<form onSubmit={onSubmit}>
					<h2>How many people?</h2>
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
					<h2>For how many meals?</h2>
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
