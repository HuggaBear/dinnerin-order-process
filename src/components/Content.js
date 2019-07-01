import React, { useContext } from "react";
import NightsAndPeople from "./NightsAndPeople";
import SpecialDiets from "./SpecialDiets";
import { ProgressContext } from "../contexts/ProgressContext";

export default function Content() {
	const { progress } = useContext(ProgressContext);
	console.log(progress);
	const content = [<NightsAndPeople />, <SpecialDiets />];
	return content[progress];
}
