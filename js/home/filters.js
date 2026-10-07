/*
    PROJECT FILTERING

    Two dropdowns (type and language) narrow down the project cards.
    Both work at the same time: a card must match every active filter
    to stay visible.

    Cards can hold several values per attribute, for example:
        data-language="javascript react d3"
*/

const filterToggle = document.querySelector(".filter-toggle");
const filterPanel = document.querySelector(".filter-panel");
const typeSelect = document.querySelector("#filter-type");
const languageSelect = document.querySelector("#filter-language");
const resetButton = document.querySelector(".filter-reset");

const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.querySelector(".project-count");
const noResultsMessage = document.querySelector(".no-results");


/* Opens and closes the filter panel */
function toggleFilterPanel() {
    const isOpen = filterToggle.getAttribute("aria-expanded") === "true";

    filterToggle.setAttribute("aria-expanded", !isOpen);
    filterPanel.hidden = isOpen;
}


/*
    Checks one card against one dropdown.

    "all" always matches. Otherwise the card's attribute is split on
    spaces and we look for the chosen value in that list, so a card
    tagged "javascript react d3" matches React and D3 and JavaScript.
*/
function cardMatches(card, attributeName, selectedValue) {
    if (selectedValue === "all") {
        return true;
    }

    const cardValues = (card.dataset[attributeName] || "").split(" ");

    return cardValues.includes(selectedValue);
}


function applyFilters() {
    let visibleProjects = 0;

    projectCards.forEach(card => {
        const matchesType = cardMatches(card, "type", typeSelect.value);
        const matchesLanguage = cardMatches(card, "language", languageSelect.value);

        const visible = matchesType && matchesLanguage;

        card.hidden = !visible;

        if (visible) {
            visibleProjects++;
        }
    });

    projectCount.textContent = `${visibleProjects} PROJECTS`;
    noResultsMessage.hidden = visibleProjects > 0;
}


function resetFilters() {
    typeSelect.value = "all";
    languageSelect.value = "all";

    applyFilters();
}


filterToggle.addEventListener("click", toggleFilterPanel);
typeSelect.addEventListener("change", applyFilters);
languageSelect.addEventListener("change", applyFilters);
resetButton.addEventListener("click", resetFilters);

/* Sets the initial project count when the page loads */
applyFilters();
