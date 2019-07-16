import React, { useContext } from "react";

import "./Meal.scss";
import { PopupContext } from "../contexts/PopupContext";
export default function Meal({
	index,
	title,
	image,
	price,
	addSelectedMeal,
	removeSelectedMeal,
	className,
	id,
	selected
}) {
	const { updatePopup } = useContext(PopupContext);
	// If the user clicks on the meal anywhere except the add/remove button, show the popup
	const mealClick = e => {
		switch (e.target.className) {
			case "add-to-cart":
				addSelectedMeal(index, title, image, price, id);
				break;
			case "remove-from-cart":
				removeSelectedMeal(index, title, image, price, id);
				break;
			default:
				// Do not display the popup for a placeholder meal (not loaded). Only loaded meals have titles.
				title && updatePopup({ showPopup: true, mealIndex: index });
		}
	};
	return (
		<div
			onClick={mealClick}
			className={`single-meal ${className}`}
			style={image && { backgroundImage: `url(${image})` }}
		>
			{title && removeSelectedMeal ? (
				<div className="remove-from-cart">-</div>
			) : title && addSelectedMeal ? (
				<div className="add-to-cart">+</div>
			) : (
				<></>
			)}
			{title && (
				<div className="title">
					{" "}
					<span className="uppercase">{`${selected ? `${index + 1}. ` : ""}${title}`}</span>
					<span className="info">i</span>
				</div>
			)}
		</div>
	);
}
