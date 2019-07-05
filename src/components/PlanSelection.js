import React, { useContext } from "react";
import "./PlanSelection.scss";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
export default function PlanSelection() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
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
				<div className="price">$79.00 Per week</div>
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
				<div className="price uppercase">$87.00 Single delivery</div>
			</div>
			<button className="button uppercase" onClick={() => updateProgress(progress + 1)}>
				Continue
			</button>
		</div>
	);
}
