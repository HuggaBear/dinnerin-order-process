import React from "react";
import "./Meal.scss";
export default function Meal({
	index,
	title,
	image,
	price,
	showPopup,
	addSelectedMeal,
	removeSelectedMeal,
	className,
	id,
	selected
}) {
	return (
		<div
			onClick={
				addSelectedMeal
					? () => addSelectedMeal(index, title, image, price, id)
					: removeSelectedMeal
					? () => removeSelectedMeal(index, title, image, price, id)
					: () => {}
			}
			className={`single-meal ${className}`}
			style={image && { backgroundImage: `url(${image})` }}
		>
			{selected ? (
				<div className="remove-from-cart" />
			) : (
				<div
					className="add-to-cart"
					onClick={addSelectedMeal && (() => addSelectedMeal(index, title, image, price, id))}
				>
					+
				</div>
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
