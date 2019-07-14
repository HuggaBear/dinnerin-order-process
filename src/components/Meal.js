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

	const mealClick = e => {
		switch (e.target.className) {
			case "add-to-cart":
				if (addSelectedMeal) {
					addSelectedMeal(index, title, image, price, id);
				} else if (removeSelectedMeal) {
					removeSelectedMeal(index, title, image, price, id);
				}
				break;
			default:
				updatePopup({ showPopup: true, mealIndex: index });
		}
	};
	return (
		<div
			onClick={mealClick}
			className={`single-meal ${className}`}
			style={image && { backgroundImage: `url(${image})` }}
		>
			{selected ? <div className="remove-from-cart" /> : <div className="add-to-cart">+</div>}
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
