// ES Module: Quotes Array
export const quotes = [
  "Stay curious, keep learning.",
  "Cybersecurity is about trust.",
  "Leadership is service.",
  "Every challenge is an opportunity."
];

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Quote Generator
const quoteButton = document.getElementById("quoteButton");
quoteButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  alert(`Motivational Quote: ${quote}`);
});

// Array Method Example
quotes.map((q, i) => console.log(`Quote ${i + 1}: ${q}`));
