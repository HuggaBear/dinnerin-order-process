import React from "react";
import "./Meal.scss";
import placeholder from "../assets/images/placeholder.png";
export default function Meal({ className, title, image = placeholder, onClick }) {
	return (
		<div
			onClick={onClick && (() => onClick(title, image))}
			className={`single-meal ${className}`}
			style={{ backgroundImage: `url(${image})` }}
		>
			{title && <div className="title uppercase">{title}</div>}
		</div>
	);
}
