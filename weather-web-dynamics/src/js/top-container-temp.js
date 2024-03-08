/**
 *
 * @param {string} selectedValue - selected city from the dropdown
 * @param {object} cityData - Details of every cities selected from the dropdown
 * @param {object} nextHrs - Array of temperature for next four hours of the selected city
 */
export function formatTempline (selectedValue, cityData, nextHrs) {
  const templine = document.querySelectorAll(".weather-temp");
  const templineArray = Array.from(templine).map(
    (element) => element.textContent
  );
  templine[0].textContent = cityData[selectedValue].temperature;
  templineArray[0] = templine[0].textContent;
  for (let j = 1; j < templineArray.length; j++) {
    templineArray[j] = nextHrs[j - 1];
    templine[j].textContent = templineArray[j];
  }
  formatTempWeatherImage(templineArray);
}

/**
 *
 * @param {object} templineArray - Array of temperature for next five hours of the selected city
 */
function formatTempWeatherImage (templineArray) {
  const tempSplitArray = templineArray.map((str) => str.split("°C").shift());
  const imageline = document.querySelectorAll(".weather-image");
  const numTempSplitArray = tempSplitArray.map((strnum) => parseFloat(strnum));

  numTempSplitArray.forEach(function (temp, i) {
    if (isRainy(temp)) {
      imageline[i].src = "../../Assets/Weather/rainyIconBlack.svg";
    }

    if (isWindy(temp)) {
      imageline[i].src = "../../Assets/Weather/windyIcon.svg";
    }

    if (isCloudy(temp)) {
      imageline[i].src = "../../Assets/Weather/cloudyIcon.svg";
    }

    if (isSunny(temp)) {
      imageline[i].src = "../../Assets/Weather/sunnyIconBlack.svg";
    }
  });
}

/**
 *
 * @param {number} value - temperature values from the templineArray
 * @returns {boolean} - true /false based on weather condition
 */
function isRainy (value) {
  return value < 18;
}

/**
 *
 * @param {number} value - temperature values from the templineArray
 * @returns {boolean} - true /false based on weather condition
 */
function isWindy (value) {
  return value >= 18 && value <= 22;
}

/**
 *
 * @param {number} value - temperature values from the templineArray
 * @returns {boolean} - true /false based on weather condition
 */
function isCloudy (value) {
  return value >= 23 && value <= 29;
}

/**
 *
 * @param {number} value - temperature values from the templineArray
 * @returns {boolean} - true /false based on weather condition
 */
function isSunny (value) {
  return value > 29;
}
