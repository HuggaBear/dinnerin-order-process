import React from "react";
import "./Meal.scss";
export default function Meal({ index, title, image, price, onClick, className, id }) {
	return (
		<div
			onClick={onClick && (() => onClick(index, title, image, price, id))}
			className={`single-meal ${className}`}
			style={image && { backgroundImage: `url(${image})` }}
		>
			{title && <div className="title uppercase">{title}</div>}
		</div>
	);
}
