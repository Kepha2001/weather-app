import { topContainer, updateTime } from "./top-container.js";
import { midContainer } from "./middle-container.js";
import { bottomContainer } from "./bottom-container.js";

let cityData;
document.addEventListener("DOMContentLoaded", function () {
  (async () => {
    const data = await fetch("../../Assets/files/data.json");
    cityData = await data.json();
    addCityOptions(cityData);
    topContainer(cityData);
    const selectedValue = "anadyr";
    document.getElementsByName("place-holder")[0].placeholder = "Anadyr";
    updateTime(selectedValue, cityData);
    midContainer(cityData);
    bottomContainer(cityData);
  })();
});

/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
function addCityOptions (cityData) {
  const listOfCity = document.getElementById("city-data-lists");
  for (const selectedValue in cityData) {
    const addOptions = document.createElement("option");
    addOptions.value =
      selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
    listOfCity.appendChild(addOptions);
  }
}
