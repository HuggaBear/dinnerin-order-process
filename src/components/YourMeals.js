import React from "react";
import "./YourMeals.scss";
import Meal from "./Meal";
export default function YourMeals({ selectedMeals, removeSelectedMeal, selectedMealCount, nights, continueClick }) {
	return (
		<div>
			<div className="your-meals">
				<div className="header">
					<h3 className="uppercase">
						Your selected meals:{" "}
						<span className="primary-color">
							{selectedMealCount}/{nights}
						</span>
					</h3>
				</div>

				{selectedMeals.map((meal, index) => (
					<Meal
						key={index}
						title={meal.title}
						image={meal.image}
						onClick={removeSelectedMeal}
						index={index}
						className={meal.selected && "selected"}
					/>
				))}
			</div>
			<div className="footer">
				<button className="uppercase button" onClick={continueClick}>
					Continue
				</button>
			</div>
		</div>
	);
}
