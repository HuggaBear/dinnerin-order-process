import React from "react";
import "./YourDesserts.scss";
export default function YourDesserts({ selectedDesserts, removeSelectedDessert, continueClick }) {
	console.log(selectedDesserts.length);
	return (
		<>
			<div className="your-meals">
				<div className="header">
					<h3 className="uppercase">Your desserts</h3>
				</div>
				{selectedDesserts.map((meal, index) => (
					<h2 key={index} onClick={removeSelectedDessert}>
						{meal.title}
					</h2>
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
