import { formatTempline } from "./top-container-temp.js";

/**
 *
 * @param {string} selectedValue - selected city from the dropdown
 * @param {object} cityData - Details of every cities selected from the dropdown
 * @param {number} hr - Hour of the selected city from the dropdown
 * @param {string} state - gives the 12 hour format for the city
 */
export function formatTimeline (selectedValue, cityData, hr, state) {
  const timeline = document.querySelectorAll(".curr-city-time");
  const timelineArray = Array.from(timeline).map(
    (element) => element.textContent
  );
  const nextHrs = cityData[selectedValue].nextFiveHrs;
  const numHour = hr;
  let num = 0;
  let numAm, numPm;
  for (let i = 1; i < timelineArray.length; i++) {
    if (numHour <= 7) {
      timelineArray[i] = `${numHour + i} ${state}`;
      timeline[i].textContent = timelineArray[i];
    } else if (numHour > 7 && numHour !== 12 && state === "PM") {
      numPm = numHourAboveSevenPm(numHour, i, num, timeline, timelineArray);
      num = numPm;
    } else if (numHour > 7 && numHour !== 12 && state === "AM") {
      numAm = numHourAboveSevenAm(numHour, i, num, timeline, timelineArray);
      num = numAm;
    } else if (numHour === 12) {
      timelineArray[i] = `${num + 1} ${state}`;
      timeline[i].textContent = timelineArray[i];
      num++;
    }
  }
  formatTempline(selectedValue, cityData, nextHrs);
}

/**
 *
 * @param {number} numHour - Hour of the selected city from the dropdown
 * @param {number} i - index for iterating a loop
 * @param {number} num - variable to store and update the hour by 1
 * @param {object} timeline - Nodelist of next four hours of the selected city
 * @param {object} timelineArray - Array of next five hours of the selected city
 * @returns {number} - updated value of the num variable
 */
function numHourAboveSevenPm (numHour, i, num, timeline, timelineArray) {
  if (numHour + i > 12) {
    timelineArray[i] = `${num + 1} AM`;
    timeline[i].textContent = timelineArray[i];
    num++;
  } else {
    if (numHour + i === 12) {
      timelineArray[i] = `${numHour + i} AM`;
      timeline[i].textContent = timelineArray[i];
    } else {
      timelineArray[i] = `${numHour + i} PM`;
      timeline[i].textContent = timelineArray[i];
    }
  }
  return num;
}

/**
 *
 * @param {number} numHour - Hour of the selected city from the dropdown
 * @param {number} i - index for iterating a loop
 * @param {number} num - variable to store and update the hour by 1
 * @param {object} timeline - Nodelist of next four hours of the selected city
 * @param {object} timelineArray - Array of next five hours of the selected city
 * @returns {number} - updated value of the num variable
 */
function numHourAboveSevenAm (numHour, i, num, timeline, timelineArray) {
  if (numHour + i > 12) {
    timelineArray[i] = `${num + 1} PM`;
    timeline[i].textContent = timelineArray[i];
    num++;
  } else {
    if (numHour + i === 12) {
      timelineArray[i] = `${numHour + i} PM`;
      timeline[i].textContent = timelineArray[i];
    } else {
      timelineArray[i] = `${numHour + i} AM`;
      timeline[i].textContent = timelineArray[i];
    }
  }
  return num;
}
