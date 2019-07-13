import React from "react";
import "./YourMeals.scss";
import Meal from "./Meal";
export default function YourMeals({ selectedMeals, removeSelectedMeal, selectedMealCount, nights, continueClick }) {
	return (
		<>
			<div className="your-meals">
				<div className="header">
					<h3 className="uppercase">
						Selected meals:{" "}
						<span className="primary-color">
							{selectedMealCount}/{nights}
						</span>
					</h3>
				</div>

				{selectedMeals.map((item, index) => (
					<Meal
						key={item.id ? item.id : index}
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
