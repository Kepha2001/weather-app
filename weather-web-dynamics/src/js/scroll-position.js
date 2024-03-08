import {
  middleCardsContainer,
  inputClick,
  rightScrollButton,
  leftScrollButton,
  cityCardContainer
} from "./middle-container.js";

/**
 *
 * @param {object} city - Details of the user selected weather cities
 */
export function inputChange (city) {
  if (Object.keys(city).length < 4) {
    inputClick.disabled = true;
  } else {
    inputClick.disabled = false;
  }
  inputClick.addEventListener("click", () => {
    cityCardContainer.scrollLeft += 350;
    hidebutton();
    updateScrollArrow(middleCardsContainer);
  });
}

/**
 *
 * @param {object} middleCardsContainer - Container to insert to all the city cards
 */
export function updateScrollArrow (middleCardsContainer) {
  if (middleCardsContainer.scrollWidth > middleCardsContainer.clientWidth) {
    if (middleCardsContainer.scrollLeft === 0) {
      leftScrollButton.style.visibility = "hidden";
      rightScrollButton.style.visibility = "visible";
    } else {
      leftScrollButton.style.visibility = "visible";
    }

    if (
      Math.round(
        middleCardsContainer.scrollLeft + middleCardsContainer.clientWidth
      ) === middleCardsContainer.scrollWidth
    ) {
      rightScrollButton.style.visibility = "hidden";
    } else {
      rightScrollButton.style.visibility = "visible";
    }
  } else {
    hidebutton();
  }
}

/**
 *
 */
export function hidebutton () {
  leftScrollButton.style.visibility = "hidden";
  rightScrollButton.style.visibility = "hidden";
}

document.querySelector(".scroll-right").addEventListener("click", () => {
  cityCardContainer.scrollLeft += 350;
  updateScrollArrow(middleCardsContainer);
});

document.querySelector(".scroll-left").addEventListener("click", () => {
  cityCardContainer.scrollLeft -= 350;
  updateScrollArrow(middleCardsContainer);
});
