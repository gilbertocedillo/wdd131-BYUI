// main.js
import { getRecipes } from './recipes.mjs'; 

// Build accessible star rating
function buildRatingHtml(rating) {
  const maxRating = 5;
  let starsHtml = '';
  for (let i = 0; i < rating; i++) {
    starsHtml += `<span aria-hidden="true" class="icon-star">⭐</span>`;
  }
  for (let i = rating; i < maxRating; i++) {
    starsHtml += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }
  return `
    <span class="rating" role="img" aria-label="Rating: ${rating} out of ${maxRating} stars">
      ${starsHtml}
    </span>
  `;
}

// Build recipe card
function renderRecipeCard(recipe) {
  const card = document.createElement('article');
  card.classList.add('recipe-card');
  const tagsHtml = recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
  card.innerHTML = `
    <div class="recipe-image-container">
      <img src="${recipe.image}" alt="Image of ${recipe.name}" loading="lazy">
      <div class="tags-container">${tagsHtml}</div>
    </div>
    <div class="recipe-details">
      <h2 class="recipe-title">${recipe.name}</h2>
      <div class="rating-container">${buildRatingHtml(recipe.rating)}</div>
      <p class="recipe-description">${recipe.description}</p>
      <div class="recipe-summary-placeholder">
        <div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>
      </div>
    </div>
  `;
  return card;
}

// Render a list of recipes
function renderRecipes(recipeList) {
  const container = document.querySelector('.recipe-card-list');
  container.innerHTML = '';
  recipeList.forEach(recipe => {
    container.appendChild(renderRecipeCard(recipe));
  });
}

// Get a random recipe
function getRandomRecipe() {
  const allRecipes = getRecipes();
  const index = Math.floor(Math.random() * allRecipes.length);
  return allRecipes[index];
}

// Filter recipes by query
function filterRecipes(query) {
  const allRecipes = getRecipes();
  const filtered = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query) ||
    recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
    (recipe.ingredients && recipe.ingredients.find(ing => ing.toLowerCase().includes(query)))
  );
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

// Initialize app
function init() {
  const randomRecipe = getRandomRecipe();
  renderRecipes([randomRecipe]);

  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = document.getElementById('recipe-search').value.toLowerCase();
      const results = filterRecipes(query);
      renderRecipes(results);
    });
  }
}

init();
