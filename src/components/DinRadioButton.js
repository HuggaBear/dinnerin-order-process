import React from "react";

export default function DinRadioButton({ value, checked, onChange }) {
	return (
		<label>
			<input type="radio" name="nights" value={value} checked={checked} onChange={onChange} />
			<span>{value}</span>
		</label>
	);
}
