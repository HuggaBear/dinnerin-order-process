import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
import "./ContinueMessage.scss";

export default function ContinueMessage({ continueClick, canContinue }) {
	const { userData } = useContext(UserDataContext);
	const { nights, selectedMealCount } = userData;

	return (
		<div className="message-wrapper uppercase">
			{!canContinue && (
				<div className="continue-message">
					Select {nights - selectedMealCount} more meal{nights - selectedMealCount > 1 && "s"} to continue
				</div>
			)}
			{canContinue && (
				<div className="continue-button">
					<button className="uppercase button" onClick={continueClick}>
						Continue
					</button>
				</div>
			)}
		</div>
	);
}
