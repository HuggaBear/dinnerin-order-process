import React from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import UserDataContextProvider from "./contexts/UserDataContext";
import ProgressContextProvider from "./contexts/ProgressContext";
import Header from "./components/Header";
import cookie from "cookie";
import axios from "axios";
import PopupContextProvider from "./contexts/PopupContext";
import * as Constants from "./constants/Constants";

const clearCookie = async (customerId) => {
  await axios.delete(
    `${
      Constants.BASE_URL_DIRECT
    }/wp-json/dinnerinquasicart/v2/quasicart/purge/notloggedin/${customerId}`
  )
}

function App() {
	const cookies = cookie.parse(document.cookie);

  try {
    clearCookie(cookies.dinner_in_gbiv_customer_id)
  } catch(err) {
    console.error(err)
  }

	return (
		<main>
			<Header />
			<ProgressContextProvider>
				<ProgressBar />
				<UserDataContextProvider>
					<PopupContextProvider>
						<Content />
					</PopupContextProvider>
				</UserDataContextProvider>
			</ProgressContextProvider>
			<Footer />
		</main>
	);
}
export default App;
