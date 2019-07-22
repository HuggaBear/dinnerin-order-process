import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import "./SpecialDiets.scss";

export default function SpecialDiets() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { vegetarian } = userData;

	const updateVegetarian = e => {
		updateUserData({ ...userData, vegetarian: e.target.value === "true" });
	};

	const onSubmit = e => {
		updateProgress(progress + 1);
		e.preventDefault();
	};

	return (
		<div className="content special-diets">
			<form onSubmit={onSubmit}>
				<h2>
					Would you prefer to select{" "}
					<span className="primary-color bold">
						<em>only</em>
					</span>{" "}
					vegetarian meals?
				</h2>
				<div className="radio-checkboxes">
					<label className={`uppercase ${vegetarian ? "checked" : ""}`}>
						<input
							type="radio"
							name={"vegetarian"}
							value={true}
							checked={vegetarian}
							onChange={updateVegetarian}
						/>
						<span className="checkbox">YES</span>
					</label>
					<label className={`uppercase ${!vegetarian ? "checked" : ""}`}>
						<input
							type="radio"
							name={"vegetarian"}
							value={false}
							checked={!vegetarian}
							onChange={updateVegetarian}
						/>
						<span className="checkbox">NO</span>
					</label>
				</div>
				<button className="uppercase button" type="submit" value="continue">
					Continue
				</button>
			</form>
		</div>
	);
}
