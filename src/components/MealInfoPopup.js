import React, { useContext } from "react";
import "./MealInfoPopup.scss";
import { PopupContext } from "../contexts/PopupContext";

export default function MealInfoPopup({ data, type, addSelectedMeal, theMeals }) {
	const { popup, updatePopup } = useContext(PopupContext);
	// Filter items if user has filtered for vegetarian
	const id = theMeals[popup.mealIndex].id;

	// Extract data from acf fields
	const { title, description, ingredients, allergens, components, meal_image } = theMeals[popup.mealIndex].acf;

	const price = theMeals[popup.mealIndex].regular_price;

	// Close the popup only if exactly the wrapper or the close button is clicked
	// Must specify this otherwise clicking on anything within the wrapper will close the popup
	const closePopup = e => {
		if (e.target.className === "meal-info-popup-wrapper" || e.target.className === "close")
			updatePopup({ showPopup: false, mealIndex: null });
	};

	// Add the meal to the users existing meals
	const addMeal = (index, title, image, price, id) => {
		addSelectedMeal(index, title, image, price, id);
		updatePopup({ showPopup: false, mealIndex: null });
	};

	const nextMeal = () =>
		popup.mealIndex < theMeals.length - 1
			? updatePopup({ ...popup, mealIndex: popup.mealIndex + 1 })
			: updatePopup({ ...popup, mealIndex: 0 });

	const prevMeal = () =>
		popup.mealIndex === 0
			? updatePopup({ ...popup, mealIndex: theMeals.length - 1 })
			: updatePopup({ ...popup, mealIndex: popup.mealIndex - 1 });

	return (
		<div className="meal-info-popup-wrapper" onClick={e => closePopup(e)}>
			<span className="prev" onClick={prevMeal}>
				◄
			</span>
			<div className="meal-info-popup">
				<div className="header">
					<div className="close" onClick={e => closePopup(e)}>
						×
					</div>
				</div>
				<img className="image" src={meal_image ? meal_image : ""} alt={""} />
				<div className="body">
					<h2 className="title">
						{title}
						{/* {price && <span className="price primary-color"> - {`$${price}`}</span>} */}
					</h2>
					<button
						className="button add-meal uppercase"
						onClick={() => addMeal(data.mealIndex, title, meal_image, price, id)}
					>
						Add{" "}
						{type
							.split("")
							.slice(0, type.length - 1)
							.join("")}
					</button>
					{/* <div className="description">
						<h3>Description</h3>
						<div dangerouslySetInnerHTML={{ __html: description }} />
					</div> */}
					<div className="description">
						<h3>Description</h3>
						<p>{description}</p>
					</div>
					<div className="ingredients">
						<h3>Ingredients</h3>
						<p>{ingredients}</p>
					</div>
					<div className="allergens">
						<h3>Allergens</h3>
						<p>{allergens}</p>
						<p>
							Made in a kitchen and on equipment that also processes products containing egg, fish, and
							soybean
						</p>
					</div>
					<div className="icons">
						<h3>Components</h3>

						{/* <img
							alt=""
							style={{
								background: "grey",
								width: "50px",
								height: "50px",
								marginRight: "1rem"
							}}
						/>
						<img alt="" style={{ background: "grey", width: "50px", height: "50px" }} /> */}
						<p>{components}</p>
					</div>

					{/* {price && <div className="price uppercase primary-color">{`$${price}`}</div>} */}
				</div>
				<div className="footer">
					<button
						className="button uppercase"
						onClick={() => addMeal(data.mealIndex, title, meal_image, price, id)}
					>
						Add{" "}
						{type
							.split("")
							.slice(0, type.length - 1)
							.join("")}
					</button>
				</div>
			</div>
			<span className="next" onClick={nextMeal}>
				►
			</span>
		</div>
	);
}
