/**
 *
 * @param {object} cityData - Details of every cities selected from the dropdown
 * @returns {object} - object of cities sorted based on weather condition
 */
export function citiesSort (cityData) {
  const tempSort = (a, b) =>
    parseInt(cityData[b].temperature) - parseInt(cityData[a].temperature);
  const humiditySort = (a, b) =>
    parseInt(cityData[b].humidity) - parseInt(cityData[a].humidity);
  const precipitationSort = (a, b) =>
    parseInt(cityData[b].precipitation) - parseInt(cityData[a].precipitation);
  const sortedCities = {
    // sorted sunny cities
    sunny: Object.fromEntries(
      Object.keys(cityData)
        .filter(
          (cityKey) =>
            parseInt(cityData[cityKey].temperature) > 29 &&
            parseInt(cityData[cityKey].humidity) < 50 &&
            parseInt(cityData[cityKey].precipitation) >= 50
        )
        .sort(tempSort)
        .map((cityKey) => [cityKey, cityData[cityKey]])
    ),
    // sorted snowy cities
    snowy: Object.fromEntries(
      Object.keys(cityData)
        .filter(
          (cityKey) =>
            parseInt(cityData[cityKey].temperature) > 20 &&
            parseInt(cityData[cityKey].temperature) < 28 &&
            parseInt(cityData[cityKey].humidity) > 50 &&
            parseInt(cityData[cityKey].precipitation) < 50
        )
        .sort(precipitationSort)
        .map((cityKey) => [cityKey, cityData[cityKey]])
    ),
    // sorted rainy cities
    rainy: Object.fromEntries(
      Object.keys(cityData)
        .filter(
          (cityKey) =>
            parseInt(cityData[cityKey].temperature) < 20 &&
            parseInt(cityData[cityKey].humidity) >= 50
        )
        .sort(humiditySort)
        .map((cityKey) => [cityKey, cityData[cityKey]])
    )
  };
  return sortedCities;
}
