import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export default function UserDataContextProvider({ children }) {
	const [userData, updateUserData] = useState({
		nights: 5,
		people: 3,
		vegetarian: false,
		meals: [{}, {}, {}, {}, {}],
		selectedMealCount: 0,
		desserts: [],
		subscriptionType: "subscription"
	});
	return <UserDataContext.Provider value={{ userData, updateUserData }}>{children}</UserDataContext.Provider>;
}
