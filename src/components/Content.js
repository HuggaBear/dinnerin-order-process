import React from "react";
import NightsAndPeople from "./NightsAndPeople";
import SpecialDiets from "./SpecialDiets";

export default function Content({ progress, updateProgress }) {
	let content;
	// Choose what content to be displayed based on order progress
	switch (progress) {
		// 1: Nights & People
		case 1:
			content = <NightsAndPeople />;
			break;

		// 2: Special Diets
		case 2:
			content = <SpecialDiets />;
			break;

		// 3: Meal Selection

		// 4: Side Selection

		// 5: Plan Selection

		// 6: Checkout
		default:
			content = <NightsAndPeople />;
	}
	return content;
}
