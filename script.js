const APP_ID = "ab7019dc";
const APP_KEY = "2ac4a8c1096f5d69711c9b1727e28680";
const URL = `https://api.edamam.com/api/nutrition-data?app_id=`;

const button = document.querySelector("#search");
const foodName = document.querySelector("#blank");
let foodList = document.querySelector(".food-list");

let caloriesTotal = document.querySelector(".calories2");
let fatsTotal = document.querySelector(".fats2");
let proteinTotal = document.querySelector(".protein2");
let carbohydratesTotal = document.querySelector(".carbohydrates2");
let counter = 0;
let caloriesZero = 0;
let fatsZero = 0;
let proteinZero = 0;
let carbohydratesZero = 0;

// function starts here
button.addEventListener("click", async () => {
  let foodName1 = foodName.value;
  const response = await axios.get(
    `${URL}${APP_ID}&app_key=${APP_KEY}&ingr=${foodName1}`
  );

  console.log(response);

  const calories1Id = document.querySelector(".calories1");
  calories1Id.innerHTML = `Calories: ${response.data.calories}`;

  const fats1Id = document.querySelector(".fats1");
  fats1Id.innerHTML = `Fats: ${response.data.totalNutrients.FAT.quantity.toFixed(
    2
  )}g`;

  const protein1Id = document.querySelector(".protein1");
  protein1Id.innerHTML = `Protein: ${response.data.totalNutrients.PROCNT.quantity.toFixed(
    2
  )}g`;

  const carbohydrates1Id = document.querySelector(".carbohydrates1");
  carbohydrates1Id.innerHTML = `Carbohydrates: ${response.data.totalNutrients.CHOCDF.quantity.toFixed(
    2
  )}g`;

  // Total
  caloriesTotal.innerHTML = `Calories: ${(caloriesZero +=
    response.data.calories)}`;

  fatsTotal.innerHTML = `Fats: ${(fatsZero +=
    Math.round(response.data.totalNutrients.FAT.quantity * 100) / 100).toFixed(
    2
  )}g`;

  proteinTotal.innerHTML = `Protein: ${(proteinZero +=
    Math.round(response.data.totalNutrients.PROCNT.quantity * 100) /
    100).toFixed(2)}g`;

  carbohydratesTotal.innerHTML = `Carbohydrates: ${(carbohydratesZero +=
    Math.round(response.data.totalNutrients.CHOCDF.quantity * 100) /
    100).toFixed(2)}g`;

  // putting input items into the Food Name:
  const foodNameinput = document.querySelector(".food-name1");
  foodNameinput.innerHTML = foodName1;

  // puting input items into the middle box
  const foodInputlist = document.querySelectorAll(".food-input ");
  foodInputlist[counter].innerHTML = foodName1;
  counter += 1;
  document.querySelector(".lastpart").style.display = "block";

  if (
    fatsZero * 9 >= caloriesZero * 0.4 &&
    fatsZero * 9 <= caloriesZero * 0.7 &&
    proteinZero * 4 >= caloriesZero * 0.15 &&
    proteinZero * 4 <= caloriesZero * 0.3 &&
    carbohydratesZero * 4 >= caloriesZero * 0.15 &&
    carbohydratesZero * 4 <= caloriesZero * 0.3
  ) {
    document.querySelector(".lastpart").innerHTML =
      "You're on a low carbohydrate diet.";
  } else {
    document.querySelector(".lastpart").innerHTML =
      "You're not on a low carbohydrate diet";
  }
});
