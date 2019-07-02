import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export default function UserDataContextProvider({ children }) {
	const [userData, updateUserData] = useState({
		nights: 5,
		people: 3,
		vegetarian: false,
		meals: [],
		sides: []
	});
	return <UserDataContext.Provider value={{ userData, updateUserData }}>{children}</UserDataContext.Provider>;
}
