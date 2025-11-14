// --- Actividad 1: Map (HTML) ---
const steps = ["one", "two", "three"];

function listTemplate(step) {
  return `<li>${step}</li>`;
}

const stepsHtml = steps.map(listTemplate);
// Clave: usa .join('') para unir las cadenas <li> sin comas.
document.querySelector("#myList").innerHTML = stepsHtml.join(''); 


// --- Actividad 2 & 3: Map y Reduce (GPA) ---
const grades = ["A", "B", "A"];

function convertGradeToPoints(grade) {
  let points = 0;
  if (grade === "A") {
    points = 4;
  } else if (grade === "B") {
    points = 3;
  }
  return points;
}

const gpaPoints = grades.map(convertGradeToPoints);

// Calcula el GPA
const gpa = gpaPoints.reduce((total, item) => total + item) / gpaPoints.length;

console.log('GPA Points:', gpaPoints);
console.log('Calculated GPA:', gpa.toFixed(3));


// --- Actividad 4: Filter (Palabras cortas) ---
const words = ["watermelon", "peach", "apple", "tomato", "grape"];

const shortWords = words.filter((word) => word.length < 6);

console.log('Short Words:', shortWords);


// --- Actividad 5: indexOf (Buscar índice) ---
const myArray = [12, 34, 21, 54];
const luckyNumber = 21;

let luckyIndex = myArray.indexOf(luckyNumber);

console.log(`Index of ${luckyNumber}: ${luckyIndex}`);