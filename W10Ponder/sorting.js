

const simpleList = [
  "oranges", "grapes", "lemons", "apples", "Bananas",
  "watermelons", "coconuts", "broccoli", "mango"
];


const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Yellowstone", "Waterfall"],
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions: "Take Highway 20 north to Ashton...",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Easy", "Tetons"],
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions: "Take Highway 33 East to Driggs...",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Moderate", "Yellowstone", "Waterfall"],
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions: "Take Highway 20 north to Ashton...",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Coffee Pot Rapids",
    distance: "2.2 miles",
    tags: ["Easy"],
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions: "Take Highway 20 north to Island Park...",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Moderate", "View"],
    description: "A steep climb to one of the largest volcanic tuff cones in the world.",
    directions: "Take Highway 33 West out of Rexburg...",
    trailhead: [43.78555, -111.98996]
  }
];




console.log("Activity 1: Sorting strings");
const simpleSort = simpleList.sort();
console.log("Default sort:", simpleSort);

function compareAsc(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
console.log("Ascending order:", simpleList.sort(compareAsc));

function compareDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}
console.log("Descending order:", simpleList.sort(compareDesc));



console.log("\nActivity 2: Filtering strings");

function searchListStrings(list, query) {
  function searchCallback(string) {
    return string.toLowerCase().includes(query.toLowerCase());
  }
  return list.filter(searchCallback);
}

console.log("Search 'b':", searchListStrings(simpleList, "b"));
console.log("Search 'an':", searchListStrings(simpleList, "an"));



console.log("\nActivity 3: Filtering and sorting objects");

function searchListObjects(list, q) {
  function searchCallback(item) {
    return (
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.description.toLowerCase().includes(q.toLowerCase()) ||
      item.tags.find(tag => tag.toLowerCase().includes(q.toLowerCase()))
    );
  }

  const filtered = list.filter(searchCallback);

  const sorted = filtered.sort((a, b) => {
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return distA - distB;
  });

  return sorted;
}

console.log("Search 'yellowstone':", searchListObjects(hikes, "yellowstone"));
console.log("Search 'moderate':", searchListObjects(hikes, "moderate"));
console.log("Search 'al':", searchListObjects(hikes, "al"));
