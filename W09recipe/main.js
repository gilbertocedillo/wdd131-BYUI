// main.js

import { getRecipes } from './recipes.mjs'; 

/**
 * Creates the HTML string for the accessible star rating based on the rating value.
 * @param {number} rating - The number of filled stars (e.g., 4)
 * @returns {string} The inner HTML for the accessible rating container.
 */
function buildRatingHtml(rating) {
    const maxRating = 5;
    let starsHtml = '';
    
    // Add filled stars
    for (let i = 0; i < rating; i++) {
        // Class 'icon-star' is styled in CSS; aria-hidden hides the emojis from screen readers
        starsHtml += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    }

    // Add empty stars
    for (let i = rating; i < maxRating; i++) {
        starsHtml += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }

    // role="img" and aria-label are critical for accessibility (Step 02)
    return `
        <span
            class="rating"
            role="img"
            aria-label="Rating: ${rating} out of ${maxRating} stars">
            ${starsHtml}
        </span>
    `;
}

/**
 * Creates a complete <article> element for a single recipe card, matching the HTML structure.
 * @param {object} recipe - The recipe object from recipes.mjs
 * @returns {HTMLElement} The complete recipe card article element.
 */
function renderRecipeCard(recipe) {
    const card = document.createElement('article');
    card.classList.add('recipe-card');
    
    // Convert the tags array into HTML tag spans
    const tagsHtml = recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Use innerHTML to build the structure efficiently, referencing recipe properties
    card.innerHTML = `
        <div class="recipe-image-container">
            <img src="${recipe.image}" alt="${recipe.name} served with vanilla ice cream" loading="lazy">
            <div class="tags-container">
                ${tagsHtml}
            </div>
        </div>
        
        <div class="recipe-details">
            <h2 class="recipe-title">${recipe.name}</h2>
            
            <div class="rating-container">
                ${buildRatingHtml(recipe.rating)}
            </div>

            <p class="recipe-description">${recipe.description}</p>

            <div class="recipe-summary-placeholder">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
    `;

    return card;
}


/**
 * Main function that runs when the page loads.
 */
function init() {
    const allRecipes = getRecipes();
    // Select the container you put in index.html
    const recipeListContainer = document.querySelector('.recipe-card-list');

    // Display the first recipe for Part 1
    if (allRecipes.length > 0 && recipeListContainer) {
        // Render the first recipe card and add it to the page
        const firstRecipeCard = renderRecipeCard(allRecipes[0]);
        recipeListContainer.appendChild(firstRecipeCard);
    }

    // Add event listener to the search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form submission and page reload
            console.log("Search button clicked!");
        });
    }
}

// Start the application
init();