import React, { useContext } from "react";
import NightsAndPeople from "./NightsAndPeople";
import SpecialDiets from "./SpecialDiets";
import { ProgressContext } from "../contexts/ProgressContext";
import MealSelection from "./MealSelection";

export default function Content() {
	const { progress } = useContext(ProgressContext);
	console.log(progress);
	const content = [<NightsAndPeople />, <SpecialDiets />, <MealSelection />];
	return content[progress];
}
