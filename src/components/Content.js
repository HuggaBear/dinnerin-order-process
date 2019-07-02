import React, { useContext } from "react";
import NightsAndPeople from "./NightsAndPeople";
import SpecialDiets from "./SpecialDiets";
import { ProgressContext } from "../contexts/ProgressContext";
import MealSelection from "./MealSelection";
import FourOhFour from "./FourOhFour";
import "./Content.scss";

export default function Content() {
	const { progress } = useContext(ProgressContext);
	const content = [<NightsAndPeople />, <SpecialDiets />, <MealSelection />];
	return (
		<div className="content">{progress >= 0 && progress < content.length ? content[progress] : <FourOhFour />}</div>
	);
}
