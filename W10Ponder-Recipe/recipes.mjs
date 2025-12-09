const recipes = [
  {
    id: "apple-crisp",
    name: "Apple Crisp",
    tags: ["dessert", "fall"],
    rating: 4,
    description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
    image: "images/Apple-Crisp-6.jpg",
    ingredients: ["apples", "sugar", "flour", "butter"]
  },
  {
    id: "spaghetti-bolognese",
    name: "Spaghetti Bolognese",
    tags: ["dinner", "pasta"],
    rating: 5,
    description: "Classic Italian pasta dish with rich meat sauce.",
    image: "images/Spaghetti-Bolognese.jpg",
    ingredients: ["spaghetti", "beef", "tomato", "onion", "garlic"]
  }
];

export function getRecipes() {
  return recipes;
}

export function getRecipeById(id) {
  return recipes.find(recipe => recipe.id === id);
}
