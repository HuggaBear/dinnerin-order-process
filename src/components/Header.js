import React from "react";
import "./Header.scss";

export default function Header() {
	return (
		<div className="header">
			<div className="header-upper uppercase">
				<span>Order by || DD/MM/YY</span>
				<span>Receive on || DD/MM/YY</span>{" "}
			</div>
			<div className="header-lower">
				<div className="inner">
					<img
						alt="DINNERin Logo"
						src="https://dinnerin.co.nz/wp-content/uploads/2018/01/Dinner-In_BW_Logo.png"
					/>
					<button className="login uppercase">Login / register</button>
				</div>
			</div>
		</div>
	);
}
