import React from "react";
import "./DinRadioButton.scss";
export default function DinRadioButton({ name, value, label, checked, onChange, extraClasses }) {
	return (
		<div className="din-radio-button">
			<label>
				<input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
				<span className={extraClasses}>{label}</span>
			</label>
		</div>
	);
}
