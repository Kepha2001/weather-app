import { citiesSort } from "./sort-cities.js";
import { updateCards } from "./update-card.js";
import {
  hidebutton,
  inputChange,
  updateScrollArrow
} from "./scroll-position.js";

const iconsClick = document.querySelectorAll(".weather-select-img");
export const inputClick = document.querySelector(".button");

const weatherImageIcon = document.querySelectorAll(".weather-image-icon");
const sunnyIcon = document.querySelector("#sunny");

export const middleCardsContainer = document.querySelector(".top-city-info-box");
export const cityCardContainer = document.querySelector(".top-city-info-box");

export const leftScrollButton = document.querySelector(".scroll-left");
export const rightScrollButton = document.querySelector(".scroll-right");

let selectedWeather = "sunny";
let userValue = 3;

/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
export function midContainer (cityData) {
  const sortedCities = citiesSort(cityData);
  defaultMidContainer(
    sortedCities[selectedWeather],
    userValue,
    selectedWeather
  );

  // User selected weather icon
  if (inputClick.value) {
    iconsClick.forEach((e) => {
      e.addEventListener("click", (e) => {
        weatherImageIcon.forEach((e) => {
          e.style.borderBottom = "none";
        });
        hidebutton();
        e.target.style.borderBottom = "3px solid #00ccff";
        selectedWeather = e.target.getAttribute("id");
        inputClick.value = 3;
        if (Object.keys(sortedCities[selectedWeather]).length < inputClick.value) {
          inputClick.value = Object.keys(sortedCities[selectedWeather]).length;
        }
        userValue = 3;
        generateCards(sortedCities[selectedWeather], userValue, selectedWeather);
      });
    });
  }

  // User selected number of weather cards
  inputClick.addEventListener("change", (e) => {
    userValue = e.target.value;
    generateCards(sortedCities[selectedWeather], userValue, selectedWeather);
    updateScrollArrow(middleCardsContainer);
  });
}

/**
 *
 * @param {object} city - Details of the user selected weather cities
 * @param {string} userValue - user choice to select the number of cities to be displayed
 * @param {string} selectedWeather - user choice of weather selected
 */
function defaultMidContainer (city, userValue, selectedWeather) {
  // default weather = sunny
  updateScrollArrow(middleCardsContainer);
  generateCards(city, userValue, selectedWeather);
  sunnyIcon.style.borderBottom = "3px solid #00ccff";
}

/**
 *
 * @param {object} city - Details of the user selected weather cities
 * @param {string} userValue -user choice to select the number of cities to be displayed
 * @param {string} selectedWeather - user choice of weather selected
 */
function generateCards (city, userValue, selectedWeather) {
  middleCardsContainer.innerHTML = "";
  inputChange(city);
  updateCards(city, userValue, selectedWeather);
}
