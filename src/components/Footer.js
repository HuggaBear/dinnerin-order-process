import React from "react";
import "./Footer.scss";
export default function Footer() {
	return (
		<div className="footer">
			<div className="footer-upper">
				<i className="fab fa-facebook-f" />
				<i className="fab fa-instagram" />
			</div>
			<div className="footer-lower">
				<span className="uppercase">Copyright 2019 © DINNERin</span>
			</div>
		</div>
	);
}
