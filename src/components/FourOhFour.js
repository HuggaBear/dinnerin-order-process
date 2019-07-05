import React, { useContext } from "react";
import { ProgressContext } from "../contexts/ProgressContext";
import "./FourOhFour.scss";
import { UserDataContext } from "../contexts/UserDataContext";
export default function FourOhFour() {
	const { updateProgress } = useContext(ProgressContext);
	const { userData, updateUserData } = useContext(UserDataContext);
	console.log(userData);
	return (
		<div className="content text-center four-oh-four">
			<h2>It appears you are lost. Get back on track</h2>
			{/* This button resets the application */}
			<button
				className="uppercase button"
				onClick={() => {
					updateUserData({
						nights: 5,
						people: 3,
						vegetarian: false,
						meals: [{}, {}, {}, {}, {}],
						selectedMealCount: 0,
						desserts: [],
						subscriptionType: "subscription"
					});
					updateProgress(0);
				}}
			>
				Reset
			</button>
		</div>
	);
}
