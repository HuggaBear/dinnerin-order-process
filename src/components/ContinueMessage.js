import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";

export default function ContinueMessage({ continueClick }) {
	const { userData } = useContext(UserDataContext);
	const { nights, selectedMealCount } = userData;
	const canContinue = !(nights - selectedMealCount);

	return (
		<div className="message-wrapper">
			{!canContinue && (
				<div className="error-message">
					Please select {nights - selectedMealCount} more meal{nights - selectedMealCount > 1 && "s"}
				</div>
			)}
			{canContinue && (
				<div className="continue-message">
					<button className="uppercase button" onClick={continueClick}>
						Continue
					</button>
				</div>
			)}
		</div>
	);
}
