import React, { useState } from "react";
import "./YourMeals.scss";
import Meal from "./Meal";
export default function YourMeals({ selectedMeals, removeSelectedMeal, selectedMealCount, nights, continueClick }) {
	const [expanded, updateExpanded] = useState(false);
	return (
		<>
			<div className={`your-meals ${expanded ? "expanded" : ""}`}>
				<div className="header">
					<h3 className="uppercase">
						Selected meals:{" "}
						<span className="primary-color">
							{selectedMealCount}/{nights}
						</span>
					</h3>
					<h3 className={`uppercase hide-lg pointer`} onClick={() => updateExpanded(!expanded)}>
						{expanded ? "Hide" : "Show"}
					</h3>
				</div>

				{selectedMeals.map((item, index) => (
					<Meal
						key={index}
						title={item.title}
						image={item.image}
						removeSelectedMeal={removeSelectedMeal}
						index={index}
						className={item.selected ? "selected" : ""}
						id={item.id}
						selected={true}
					/>
				))}
				<div className="footer">
					<button className="uppercase button" onClick={continueClick}>
						Continue
					</button>
				</div>
			</div>
		</>
	);
}
