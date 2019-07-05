import React, { useContext } from "react";
import "./YourDesserts.scss";
import { ProgressContext } from "../contexts/ProgressContext";

export default function YourDesserts({ selectedDesserts, removeSelectedDessert }) {
	const { progress, updateProgress } = useContext(ProgressContext);
	const subtotal = selectedDesserts.reduce((total, current) => total + parseFloat(current.price), 0).toFixed(2);
	return (
		<>
			<div className="your-desserts">
				<div className="header">
					<h3 className="uppercase">Your desserts</h3>
				</div>
				{selectedDesserts.map((meal, index) => (
					<div className="selected-dessert primary-color" key={index}>
						<div className="title">
							<span className="remove" onClick={() => removeSelectedDessert(index)}>
								×
							</span>
							{meal.title}
						</div>
						<span className="price">{`$${meal.price}`}</span>
					</div>
				))}
				<div className="footer">
					<div className="subtotal primary-color">
						<span className="uppercase ">Subtotal</span>
						<span className="price">{`$${subtotal}`}</span>
					</div>
					<button className="uppercase button" onClick={() => updateProgress(progress + 1)}>
						Continue
					</button>
				</div>
			</div>
		</>
	);
}
