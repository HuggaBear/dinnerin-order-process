import React, { createContext, useState } from "react";

export const ProgressContext = createContext();

export default function ProgressContextProvider({ children }) {
	const [progress, updateProgress] = useState(0);
	return <ProgressContext.Provider value={{ progress, updateProgress }}>{children}</ProgressContext.Provider>;
}
