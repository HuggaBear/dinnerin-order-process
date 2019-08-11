import React, { useContext, useEffect, useState } from "react";
import "./PlanSelection.scss";
import { UserDataContext } from "../contexts/UserDataContext";
import axios from "axios";
import ReactLoading from "react-loading";
import cookie from "cookie";

export default function PlanSelection() {
	const [loaded, updateLoaded] = useState(false);
	const [data, updateData] = useState({
		subscription: {
			perWeek: null,
			perMeal: null
		},
		singlePurchase: {
			perWeek: null,
			perMeal: null
		}
	});

	const continueClick = async e => {
		try {
			// Get the browser cookies as an object containing key value pairs
			var cookies = cookie.parse(document.cookie);

			// Look for dinnerin_order_cookieid
			var dinner_in_gbiv_customer_id = cookies.dinner_in_gbiv_customer_id;

			// Set subscription / single purchase
			await axios.get(
				`https://dinnerin.alphabean.co.nz/wp-json/dinnerinquasicart/v2/quasicart/${
					userData.plan === "subscription" ? "setsubscription" : "setsinglepurchase"
				}/notloggedin/${dinner_in_gbiv_customer_id}`
			);
			window.location.href = "https://dinnerin.alphabean.co.nz/checkout/";
		} catch (err) {
			console.log(err);
		}
	};

	const { userData, updateUserData } = useContext(UserDataContext);
	const { nights, people } = userData;
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(
					`https://proxy.alphabean.co.nz/api/dinnerin/price?nights=${nights}&people=${people}`
				);

				updateData(d => {
					return { ...result.data };
				});
				updateLoaded(true);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [nights, people]);

	return (
		<div className="content plan-selection">
			<h2 className="uppercase">Please select your preferred plan</h2>

			<div
				className={`card subscription ${userData.plan === "subscription" ? "selected" : ""}`}
				onClick={() => updateUserData({ ...userData, plan: "subscription" })}
			>
				<div className="info">
					<h3 className="uppercase">Subscription</h3>
					<p>
						Sign up to a subscription and enjoy the benefits of 10% off and not having the hassle of
						entering in your details each time
					</p>
				</div>
				{loaded ? (
					<div className="price uppercase">
						{`$${data.subscription.perWeek} Per Week`} <br />
						{`$${data.subscription.perMeal} Per Meal`}
					</div>
				) : (
					<div className="loading">
						<ReactLoading type="cubes" color={userData.plan === "subscription" ? "#ffffff" : "#00a651"} />
					</div>
				)}
			</div>

			<div
				className={`card single-purchase ${userData.plan === "single" ? "selected" : ""}`}
				onClick={() => updateUserData({ ...userData, plan: "single" })}
			>
				<div className="info">
					<h3 className="uppercase">Try us!</h3>
					<p>
						Sign up to a subscription and enjoy the benefits of 10% off and not having the hassle of
						entering in your details each time
					</p>
				</div>
				{loaded ? (
					<div className="price uppercase">
						{`$${data.singlePurchase.perWeek} Per Week`}
						<br />
						{`$${data.singlePurchase.perMeal} Per Meal`}
					</div>
				) : (
					<div className="loading">
						<ReactLoading type="cubes" color={userData.plan === "single" ? "#ffffff" : "#00a651"} />
					</div>
				)}
			</div>

			<div className="cta">
				<button className="button uppercase" onClick={continueClick}>
					Continue
				</button>
			</div>
		</div>
	);
}
