import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import "./NightsAndPeople.scss";
import DinRadioButton from "./DinRadioButton";

export default function NightsAndPeople() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { nights, people } = userData;
	console.log(nights);

	const updateNights = e => {
		console.log("clicked");
		updateUserData({ ...userData, nights: parseInt(e.target.value) });
	};

	const updatePeople = e => {
		updateUserData({ ...userData, people: parseInt(e.target.value) });
	};
	return (
		<form>
			<h2 className="uppercase">How many nights?</h2>
			<div className="radio-squares">
				<DinRadioButton checked={nights === 3} value={3} onChange={updateNights} />
				<DinRadioButton checked={nights === 5} value={5} onChange={updateNights} />
				<DinRadioButton checked={nights === 7} value={7} onChange={updateNights} />
			</div>
			<h2 className="uppercase">How many people?</h2>
			<div className="radio-squares">
				<DinRadioButton checked={people === 1} value={1} onChange={updatePeople} />
				<DinRadioButton checked={people === 2} value={2} onChange={updatePeople} />
				<DinRadioButton checked={people === 3} value={3} onChange={updatePeople} />
				<DinRadioButton checked={people === 4} value={4} onChange={updatePeople} />
				<DinRadioButton checked={people === 5} value={5} onChange={updatePeople} />
				<DinRadioButton checked={people === 6} value={6} onChange={updatePeople} />
				<DinRadioButton checked={people === 7} value={7} onChange={updatePeople} />
			</div>
		</form>
	);
}
