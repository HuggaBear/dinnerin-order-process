import React from "react";
import "./Meal.scss";

export default function Meal({ className, title, image }) {
	return (
		<div className={`single-meal ${className}`} style={{ backgroundImage: `url(${image})` }}>
			<div className="title uppercase">{title}</div>
		</div>
	);
}
