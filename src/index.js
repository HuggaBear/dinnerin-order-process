import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
ReactDOM.render(
	<BrowserRouter>
		<Route exact path="/embed-react/" component={App} />
	</BrowserRouter>,
	document.getElementById("react-app")
);
