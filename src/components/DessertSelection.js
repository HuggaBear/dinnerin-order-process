import React, { useState, useContext } from "react";
import "./DessertSelection.scss";
import Meals from "./Meals";
import YourDesserts from "./YourDesserts";
import { UserDataContext } from "../contexts/UserDataContext";
import ContinueMessage from "./ContinueMessage";
import { ProgressContext } from "../contexts/ProgressContext";
import axios from "axios";
import cookie from "cookie";
import ReactLoading from "react-loading";

export default function DessertSelection() {
	const [loaded, setLoaded] = useState(true);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { desserts } = userData;
	const cookies = cookie.parse(document.cookie);
	const dinner_in_gbiv_customer_id = cookies.dinner_in_gbiv_customer_id;
	// Add a meal to the selected desserts list
	const addSelectedDessert = (index, title, image, price, id) => {
		// If the dessert already exists in the array, update its quantity, else add it with quantity x 1
		for (let i = 0; i < desserts.length; i++) {
			if (desserts[i].id === id) {
				updateUserData({
					...userData,
					desserts: [
						...desserts.slice(0, i),
						{ title, image, price, id, quantity: desserts[i].quantity + 1 },
						...desserts.slice(i + 1)
					]
				});
				return;
			}
		}
		updateUserData({
			...userData,
			desserts: [...desserts, { title, image, price, id, quantity: 1 }]
		});
	};

	// Remove a meal from the selected desserts list
	const removeSelectedDessert = index => {
		if (desserts[index].quantity === 1) {
			updateUserData({
				...userData,
				desserts: [...desserts.slice(0, index), ...desserts.slice(index + 1)]
			});
		} else {
			const { title, image, price, id, quantity } = desserts[index];
			updateUserData({
				...userData,
				desserts: [
					...desserts.slice(0, index),
					{ title, image, price, id, quantity: quantity - 1 },
					...desserts.slice(index + 1)
				]
			});
		}
	};

	// Add all meals to the database and continue to the next step
	const continueClick = async () => {
		try {
			setLoaded(false);

			// Purge all previous meal selections
			await axios.delete(
				`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/purgealldesserts/notloggedin/${dinner_in_gbiv_customer_id}`
			);

			// Add all the new meals to the database (synchronous)
			for (let i = 0; i < desserts.length; i++) {
				for (let j = 0; j < desserts[i].quantity; j++) {
					await axios.post(
						`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/adddessert/notloggedin/${dinner_in_gbiv_customer_id}`,
						{
							dessert_post_id: desserts[i].id
						}
					);
				}
			}

			updateProgress(progress + 1);
		} catch (err) {
			console.log(err);
			setLoaded(true);
		}
	};

	return loaded ? (
		<div className="content dessert-selection">
			<h2 className="header">Select desserts to go with your meal</h2>
			<ContinueMessage continueClick={continueClick} canContinue={true} />
			<YourDesserts selectedDesserts={desserts} removeSelectedDessert={removeSelectedDessert} />
			<Meals type="desserts" addSelectedMeal={addSelectedDessert} buttons={false} />
		</div>
	) : (
		<div className="content loading">
			<ReactLoading type="cubes" color="#00a651" />
		</div>
	);
}
