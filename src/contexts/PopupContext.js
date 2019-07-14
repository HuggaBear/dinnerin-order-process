import React, { createContext, useState } from "react";

export const PopupContext = createContext();

export default function PopupContextProvider({ children }) {
	const [popup, updatePopup] = useState({
		showPopup: false,
		mealIndex: null
	});
	return <PopupContext.Provider value={{ popup, updatePopup }}>{children}</PopupContext.Provider>;
}
