import React, { useContext, useEffect, useState } from "react";
import "./PlanSelection.scss";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import axios from "axios";
export default function PlanSelection() {
	const [data, updateData] = useState({
		subPrice: null,
		singlePrice: null
	});
	const { userData, updateUserData } = useContext(UserDataContext);
	const { nights, people } = userData;
	const { progress, updateProgress } = useContext(ProgressContext);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(
					`http://localhost:8081/api/dinnerin/products?nights=${nights}&people=${people}`
				);
				console.log(result.data);
				result.data.map(item => {
					console.log(item.slug);
				});
				// updateData(d => {
				// 	return { subPrice: result.data, singlePrice: result.data };
				// });
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
				<div className="price">{"$" + data.subPrice ? data.subPrice : "0.00"} Per week</div>
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
				<div className="price uppercase">
					{"$" + data.singlePrice ? data.singlePrice : "0.00"} Single delivery
				</div>
			</div>
			<button className="button uppercase" onClick={() => updateProgress(progress + 1)}>
				Continue
			</button>
		</div>
	);
}
