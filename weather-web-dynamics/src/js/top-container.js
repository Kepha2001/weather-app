import { formatTimeline } from "./top-container-time.js";
let intervalId;
/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
export function topContainer (cityData) {
  const citySelect = document.querySelector(".select-city");

  citySelect.addEventListener("change", (city) => {
    let selectedValue = city.target.value;
    selectedValue =
      selectedValue.charAt(0).toLowerCase() + selectedValue.slice(1);
    if (!Object.keys(cityData).includes(selectedValue)) {
      alert("Please enter a valid city!");
      citySelect.value = "";
    } else {
      document.getElementsByName(
        "place-holder"
      )[0].placeholder = `${selectedValue}`;
      updateTime(selectedValue, cityData);
    }
  });
}

/**
 *
 * @param {string} selectedValue - selected city from the dropdown
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
export function updateTime (selectedValue, cityData) {
  formatImage(selectedValue);
  formatDateAndTime(selectedValue, cityData);
  formatTempAndHumidity(selectedValue, cityData);
  clearInterval(intervalId);
  intervalId = setInterval(
    () => formatDateAndTime(selectedValue, cityData),
    1000
  );
}

/**
 *
 * @param {string} selectedValue - selected city from the dropdown
 */
function formatImage (selectedValue) {
  const cityPic = document.querySelector(".city-pic");
  cityPic.src = `../../Assets/cities/${selectedValue}.svg`;
}

/**
 *
 * @param {string} selectedValue - selected city from the dropdown
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
function formatDateAndTime (selectedValue, cityData) {
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: cityData[selectedValue].timeZone
  });
  const dateObj = new Date(currentDate);
  let hr = dateObj.getHours();
  const min = dateObj.getMinutes().toString().padStart(2, "0");
  const second = dateObj.getSeconds().toString().padStart(2, "0");
  const state = hr < 12 ? "AM" : "PM";
  hr = hr > 12 ? hr - 12 : hr;
  hr = hr === 0 ? 12 + +hr : hr;
  const hour = hr.toString().padStart(2, "0");
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const day = dateObj.getDate().toString().padStart(2, "0");
  const year = dateObj.getFullYear().toString();

  document.querySelector(".hr-min").textContent = `${hour}:${min}:`;
  document.querySelector(".second").textContent = `${second}`;
  document.querySelector(".date").textContent = `${day} - ${month} - ${year}`;

  const ampm = document.querySelector(".curr-city-clock");
  if (state === "AM") {
    ampm.src = "../../Assets/General/amState.svg";
  } else {
    ampm.src = "../../Assets/General/pmState.svg";
  }
  formatTimeline(selectedValue, cityData, hr, state);
}

/**
 *
 * @param {string} selectedValue - selected city from the dropdown
 * @param {object} cityData - Details of every cities selected from the dropdown
 */
function formatTempAndHumidity (selectedValue, cityData) {
  const tempCelsius = document.querySelector(".temp-celsius");
  const tempFahrenheit = document.querySelector(".temp-fah");
  const humidity = document.querySelector(".humidity");
  const precipitation = document.querySelector(".precipitation");

  const [value] = cityData[selectedValue].temperature.split("°");
  const calcFahrenheit = (9 / 5) * Number(value) + 32;
  const fahRoundoff = Math.round(calcFahrenheit);

  tempFahrenheit.textContent = `${fahRoundoff}°F `;
  tempCelsius.textContent = `${cityData[selectedValue].temperature}`;
  humidity.textContent = `${cityData[selectedValue].humidity}`;
  precipitation.textContent = `${cityData[selectedValue].precipitation}`;
}
