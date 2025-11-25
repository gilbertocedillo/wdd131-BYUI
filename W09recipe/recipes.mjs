// recipes.mjs

const recipes = [
    {
        id: "apple-crisp",
        name: "Apple Crisp",
        tags: ["dessert", "fall"],
        rating: 4, // 4 out of 5 stars
        description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
        // **CRITICAL FIX: Image path synchronized with the file name used**
        image: "images/Apple-Crisp-6.jpg", 
    },
    // Add more recipes here when you expand the project
];

/**
 * Returns the entire list of recipes.
 * @returns {Array} An array of recipe objects.
 */
export function getRecipes() {
    return recipes;
}

/**
 * Finds a single recipe by its ID.
 * @param {string} id - The unique ID of the recipe.
 * @returns {Object | undefined} The matching recipe object, or undefined.
 */
export function getRecipeById(id) {
    return recipes.find(recipe => recipe.id === id);
}