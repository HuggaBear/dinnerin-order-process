import React from "react";

export default function DinRadioButton({ name, value, checked, onChange }) {
	return (
		<label>
			<input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
			<span>{value}</span>
		</label>
	);
}
