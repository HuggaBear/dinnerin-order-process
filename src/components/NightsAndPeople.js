import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";

export default function NightsAndPeople() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { progress, updateProgress } = useContext(ProgressContext);
	console.log(progress);
	const { nights, people } = userData;
	const radioStyle = {
		display: "inline-block",
		border: "3px solid green",
		color: "black",
		width: "20px",
		height: "20px"
	};
	const radioStyleChecked = {
		backgroundColor: "green",
		color: "white"
	};
	const setNights = () => {};
	return (
		<form className="nights-and-people">
			<div className="nights">
				<h1 className="uppercase">How many nights?</h1>
				<div className="radio-squares">
					<label htmlFor="">
						<input
							type="radio"
							name="nights"
							value="3"
							checked={nights === 3}
							onChange={e => updateUserData({ ...userData, nights: parseInt(e.target.value) })}
						/>
						<span style={nights === 3 ? { ...radioStyle, ...radioStyleChecked } : radioStyle}>3</span>
					</label>
					<label htmlFor="">
						<input
							type="radio"
							name="nights"
							value="5"
							checked={nights === 5}
							onChange={e => updateUserData({ ...userData, nights: parseInt(e.target.value) })}
						/>
						5
					</label>
					<label htmlFor="">
						<input
							type="radio"
							name="nights"
							value="7"
							checked={nights === 7}
							onChange={e => updateUserData({ ...userData, nights: parseInt(e.target.value) })}
						/>
						7
					</label>
				</div>
			</div>
			<div className="people">
				<h1 className="uppercase">How many people?</h1>
			</div>
		</form>
	);
}
