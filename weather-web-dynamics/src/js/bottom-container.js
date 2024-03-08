const continentCardsContainer = document.querySelector(".bottom-last-section");

const continentName = document.querySelector(".bottom-section-continent-arrow-left");
const continentTemp = document.querySelector(".bottom-section-continent-arrow-right");

const continentNameArrow = document.querySelector(".name-arrow");
const continentTempArrow = document.querySelector(".temp-arrow");

let isContinentSort = true;
let isTemperatureSort = false;
let time;

/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
export function bottomContainer (cityData) {
  sortContinentCities(cityData, isContinentSort, isTemperatureSort);
  continentName.addEventListener("click", () => {
    toggleNameArrow(cityData);
  });

  continentTemp.addEventListener("click", () => {
    toggleTempArrow(cityData);
  });
}

/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
function toggleNameArrow (cityData) {
  isContinentSort = !isContinentSort;
  if (continentNameArrow.src.endsWith("arrowDown.svg")) {
    continentNameArrow.src = "./../../assets/general/arrowUp.svg";
  } else {
    continentNameArrow.src = "./../../assets/general/arrowDown.svg";
  }
  sortContinentCities(cityData, isContinentSort, isTemperatureSort);
}

/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
function toggleTempArrow (cityData) {
  isTemperatureSort = !isTemperatureSort;
  if (continentTempArrow.src.endsWith("arrowDown.svg")) {
    continentTempArrow.src = "./../../assets/general/arrowUp.svg";
  } else {
    continentTempArrow.src = "./../../assets/general/arrowDown.svg";
  }
  sortContinentCities(cityData, isContinentSort, isTemperatureSort);
}

/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 * @param {boolean} isContinentSort - sort by continents
 * @param {boolean} isTemperatureSort - sort by temperature
 */
function sortContinentCities (cityData, isContinentSort, isTemperatureSort) {
  const continents = [];
  Object.keys(cityData).forEach((city) => {
    continents.push(...cityData[city].timeZone.split("/").slice(0, 1));
  });
  let continentAscending = [...new Set(continents)].sort();
  continentAscending = isContinentSort ? continentAscending.reverse() : continentAscending;
  const sortedObject = {};
  const sortedArray = [];
  continentAscending.forEach((cont) => {
    const compareByTemperature = (a, b) =>
      isTemperatureSort ? parseInt(cityData[b].temperature) - parseInt(cityData[a].temperature) : parseInt(cityData[a].temperature) - parseInt(cityData[b].temperature);
    const continentCities = sortedArray.push(
      Object.keys(cityData)
        .filter((city) => cityData[city].timeZone.startsWith(cont))
        .sort(compareByTemperature)
    );
    sortedObject[cont] = continentCities;
  });
  updateContinentCards(sortedArray, cityData);
}
/**
 *
 * @param {object} city - Details of every cities selected from the dropdown
 * @param {object} sortedArraycities - Array of sorted cities
 */
function continentsCardsTime (city, sortedArraycities) {
  const continentCards = document.querySelectorAll(".continent-city-card");
  continentCards.forEach((e, index) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: city[sortedArraycities[index]].timeZone
    };
    const cityTime = new Date().toLocaleString("en-US", {
      ...options
    });
    const continentCityTime = e.querySelector(".continent-city-time");
    continentCityTime.textContent = cityTime;
  });
}

/**
 *
 * @param {object} sortedArray - Array of the sorted cities based on user choice
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
function updateContinentCards (sortedArray, cityData) {
  continentCardsContainer.innerHTML = "";
  const sortedArraycities = sortedArray.flat();
  sortedArraycities.forEach((city, index) => {
    // const cityTime = continentsCardsTime(cityData, city);
    if (index < 12) {
      const html = `
                <div class="continent-city-card">
                    <div class="continent-city-name">
                        <p class="continent-name">${cityData[city].timeZone.split("/").slice(0, 1)}</p>
                        <br >
                        <p class="continent-city">${cityData[city].cityName},</p>
                        <p class="continent-city-time"></p>
                    </div>
                    <div class="continent-city-temp">
                        <p class="continent-temp">${cityData[city].temperature}</p>
                        <img
                            class="continent-city-weather-image"
                            src="./../../assets/weather/humidityIcon.svg"
                            alt="weather-image"
                        >
                        <p class="continent-city-weather-percent">${cityData[city].humidity}</p>
                    </div>
                </div>
                `;
      continentCardsContainer.insertAdjacentHTML("beforeend", html);
    }
    continentsCardsTime(cityData, sortedArraycities);
    clearInterval(time);
    time = setInterval(() => {
      continentsCardsTime(cityData, sortedArraycities);
    }, 1000);
  });
}
