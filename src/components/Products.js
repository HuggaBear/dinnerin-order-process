import React, { Component } from "react";
import "./Products.scss";
import getProducts from "../helpers/ServiceWorker.js";

export class Products extends Component {
	state = {
		products: [],
		meals: [],
		isLoaded: false,
		error: false
	};

	async componentDidMount() {
		const data = await getProducts();
		this.setState(data);
	}

	render() {
		//console.log(this.state);
		const { products, meals, isLoaded } = this.state;

		const productsHTML = isLoaded ? (
			products.map((item, index) => {
				return (
					<div key={index} className="product-item">
						<h2 className="product-name">{item.name}</h2>
						<img src={item.images[0].src} alt="A delicious product" className="product-image" />
						<p dangerouslySetInnerHTML={{ __html: item.short_description }} className="description" />
					</div>
				);
			})
		) : (
			<div>Loading...</div>
		);
		return (
			<div>
				<h1>PRODUCTS</h1>
				<div className="grid-container">{productsHTML}</div>
				<h1>MEALS</h1>
				<div className="grid-container">
					{meals.map((item, index) => {
						return (
							<div key={index} className="grid-item">
								<h2 className="product-name">{item.acf.title}</h2>
								<img src={item.acf.image} alt="A delicious product" className="product-image" />
								<p dangerouslySetInnerHTML={{ __html: item.acf.description }} className="description" />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Products;
