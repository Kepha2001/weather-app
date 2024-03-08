import { middleCardsContainer } from "./middle-container.js";
let time;
/**
 *
 * @param {object} city - Details of the user selected weather cities
 * @param {string} userValue -user choice to select the number of cities to be displayed
 * @param {string} selectedWeather - user choice of weather selected
 */
export function updateCards (city, userValue, selectedWeather) {
  let count = 0;
  Object.keys(city).forEach((cityName) => {
    let weatherImgIcon = selectedWeather;
    if (weatherImgIcon === "sunny" || weatherImgIcon === "rainy") {
      weatherImgIcon = selectedWeather;
    } else {
      weatherImgIcon = "snowflake";
    }

    if (count < +userValue) {
      const html = `
      <div class="top-cities-info">
        <div class="top-city-info-name-temp-time">
            <div class="top-city-name-and-temp">
                <div>
                    <div class="top-city-name-time">${city[cityName].cityName}</div>
                    <div class="top-city-name-time top-city-time"></div>
                </div>
                <div>
                    <img
                        class="top-city-image"
                        src="./../../assets/weather/${weatherImgIcon}Icon.svg"
                        alt="top city image"
                    >
                    <p class="top-city-temp">${city[cityName].temperature}</p>
                </div>
            </div>
        </div>
        <div class="top-city-background-image" style = "background-image: url('./../../assets/cities/${city[cityName].cityName}.svg')">
            <div class="top-city-date"></div>
            <div class="top-city-min-temp">
                <img
                    src="./../../assets/weather/humidityIcon.svg"
                    alt="top-city-min-temp"
                >
                <p class="min-temp">
                 ${city[cityName].humidity}
                </p>
            </div>
            <div class="top-city-max-temp">
                <img
                    src="./../../assets/weather/precipitationIcon.svg"
                    alt="top-city-max-temp"
                >
                <p class="max-temp">
                ${city[cityName].precipitation}
                </p>
            </div>
        </div>
      </div>`;
      middleCardsContainer.insertAdjacentHTML("beforeend", html);
      count++;
    }
    cityCardsTime(city, cityName);
    clearInterval(time);
    time = setInterval(() => {
      cityCardsTime(city, cityName);
    }, 1000);
  });
}
/**
 *
 * @param {object} city - Details of the user selected weather cities
 * @param {string} cityName - Names of the cities based on weather condition
 */
function cityCardsTime (city, cityName) {
  const middleCityCards = document.querySelectorAll(".top-cities-info");
  middleCityCards.forEach((e) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: city[cityName].timeZone
    };
    const cityTime = new Date()
      .toLocaleString("en-US", {
        ...options,
        day: undefined,
        month: undefined,
        year: undefined
      });
    const cityDate = new Date()
      .toLocaleString("en-UK", { ...options, hour: undefined, minute: undefined })
      .replaceAll(" ", " - ");

    const middleCardCityDate = e.querySelector(".top-city-date");
    const middleCardCityTime = e.querySelector(".top-city-time");
    middleCardCityTime.textContent = cityTime;
    middleCardCityDate.textContent = cityDate;
  });
}
