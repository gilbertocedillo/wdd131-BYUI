const themeSelector = document.getElementById("theme");
const logo = document.getElementById("logo");

themeSelector.addEventListener("change", changeTheme);

function changeTheme() {
  const selectedTheme = themeSelector.value;
  document.body.classList.toggle("dark", selectedTheme === "dark");

  // Swap logo image based on theme
  logo.src = selectedTheme === "dark"
    ? "images/byui-logo-white.png"
    : "images/byui-logo.png";
}
