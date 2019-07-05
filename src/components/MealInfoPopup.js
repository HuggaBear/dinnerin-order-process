import React, { useContext } from "react";
import "./MealInfoPopup.scss";
import { UserDataContext } from "../contexts/UserDataContext";

export default function MealInfoPopup({ data, updateData, type, addSelectedMeal }) {
	const { userData } = useContext(UserDataContext);

	// Filter items if user has filtered for vegetarian
	const items = data[type].filter(item => (userData.vegetarian ? item.acf.vegetarian : true));
	const id = items[data.mealIndex].id;
	const { title, image, description, price } = items[data.mealIndex].acf;
	console.log(id);
	console.log(title);
	const closePopup = e => {
		if (e.target.className === "meal-info-popup-wrapper" || e.target.className === "close")
			updateData({ ...data, showPopup: false, mealId: null });
	};
	const addMeal = (index, title, image, price, id) => {
		addSelectedMeal(index, title, image, price, id);
		updateData({ ...data, showPopup: false, mealId: null });
	};
	return (
		<div className="meal-info-popup-wrapper" onClick={e => closePopup(e)}>
			<div className="meal-info-popup">
				<div className="header">
					<h2>
						{title}
						{price && <span className="price primary-color"> - {`$${price}`}</span>}
					</h2>
					<div className="close" onClick={e => closePopup(e)}>
						×
					</div>
				</div>
				<div className="body">
					<img className="image" src={image} alt={""} />
					<div className="description">
						<h3>Description</h3>
						<div dangerouslySetInnerHTML={{ __html: description }} />
					</div>
					<div className="ingredients">
						<h3>Ingredients</h3>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, ipsum. Minima atque cum
							rerum alias vitae recusandae molestiae! Perspiciatis sunt vero voluptates! Hic totam
							voluptate sed quis accusamus necessitatibus ad!
						</p>
					</div>
					<div className="allergens">
						<h3>Allergens</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat voluptate dolorum, esse
							dolores doloremque nam eligendi repudiandae fuga amet iste vitae nulla incidunt autem a iure
							accusamus velit, id explicabo!
						</p>
					</div>
					<div className="nutrition">
						<h3>Nutrition</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo voluptatem eum totam
							excepturi, cupiditate minima dolorem temporibus soluta laborum praesentium nam eaque vel
							laudantium voluptatibus quae laboriosam qui assumenda iusto?
						</p>
					</div>
					{price && <div className="price uppercase primary-color">{`$${price}`}</div>}
				</div>
				<div className="footer">
					<button
						className="button uppercase"
						onClick={() => addMeal(data.mealIndex, title, image, price, id)}
					>
						Add{" "}
						{type
							.split("")
							.slice(0, type.length - 1)
							.join("")}
					</button>
				</div>
			</div>
		</div>
	);
}
