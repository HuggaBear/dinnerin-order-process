import React, { useContext } from "react";
import "./MealInfoPopup.scss";
import { UserDataContext } from "../contexts/UserDataContext";

export default function MealInfoPopup({ data, updateData, type, addSelectedMeal, nextMeal, prevMeal }) {
	const { userData } = useContext(UserDataContext);

	// Filter items if user has filtered for vegetarian
	const items = data[type].filter(item => (userData.vegetarian ? item.acf.vegetarian : true));
	const id = items[data.mealIndex].id;

	// Extract data from acf fields
	const { title, image, price } = items[data.mealIndex].acf;

	// Close the popup only if exactly the wrapper or the close button is clicked
	// Must specify this otherwise clicking on anything within the wrapper will close the popup
	const closePopup = e => {
		if (e.target.className === "meal-info-popup-wrapper" || e.target.className === "close")
			updateData({ ...data, showPopup: false, mealIndex: null });
	};

	// Add the meal to the users existing meals
	const addMeal = (index, title, image, price, id) => {
		addSelectedMeal(index, title, image, price, id);
		updateData({ ...data, showPopup: false, mealIndex: null });
	};
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
				<img className="image" src={image} alt={""} />
				<div className="body">
					<h2 className="title">
						{title}
						{/* {price && <span className="price primary-color"> - {`$${price}`}</span>} */}
					</h2>
					{/* <div className="description">
						<h3>Description</h3>
						<div dangerouslySetInnerHTML={{ __html: description }} />
					</div> */}
					<div className="ingredients">
						<h3>Ingredients</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
							nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo con
						</p>
					</div>
					<div className="nutrition">
						<table>
							<thead>
								<tr>
									<th>Nutrition</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="uppercase">Energy</td>
									<td>2000Kj</td>
								</tr>
								<tr>
									<td className="uppercase">Fat</td>
									<td>20g</td>
								</tr>
								<tr>
									<td className="uppercase">Saturated fat</td>
									<td>5g</td>
								</tr>
								<tr>
									<td className="uppercase">Sodium</td>
									<td>1500mg</td>
								</tr>
								<tr>
									<td className="uppercase">Total carbohydrates</td>
									<td>50g</td>
								</tr>
								<tr>
									<td className="uppercase">Total sugars</td>
									<td>20g</td>
								</tr>
								<tr>
									<td className="uppercase">Protein</td>
									<td>10g</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="allergens">
						<h3>Allergens</h3>
						<p>Contains Milk, Egg and Soy</p>
					</div>
					<div className="icons">
						<img
							alt=""
							style={{
								background: "grey",
								width: "50px",
								height: "50px",
								marginRight: "1rem"
							}}
						/>
						<img alt="" style={{ background: "grey", width: "50px", height: "50px" }} />
					</div>

					{/* {price && <div className="price uppercase primary-color">{`$${price}`}</div>} */}
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
			<span className="next" onClick={nextMeal}>
				►
			</span>
		</div>
	);
}
