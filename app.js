// return stops a funciton
// break stops a loop
let totalClicks = 0;
let maxClicks = 5;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `images/${productNames[i]}.jpeg`);
}

function randomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

//get three random products from my product array
// tim called his productIndex1 = Index1 etc. but I changed it to make it easier to read
function renderImages() {
  let productIndex1 = randomProductIndex();
  let productIndex2 = randomProductIndex();
  let productIndex3 = randomProductIndex();

  while (
    productIndex1 === productIndex2 ||
    productIndex1 === productIndex3 ||
    productIndex2 === productIndex3
  ) {
    productIndex2 = randomProductIndex();
    productIndex3 = randomProductIndex();
  }

  //to retrieve our image elements from html

  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  //to add a src attribute, create a src property
  img1.src = Product.allProducts[productIndex1].src;
  img2.src = Product.allProducts[productIndex2].src;
  img3.src = Product.allProducts[productIndex3].src;

  img1.alt = Product.allProducts[productIndex1].name;
  img2.alt = Product.allProducts[productIndex2].name;
  img3.alt = Product.allProducts[productIndex3].name;

  //increase thte views for the three products we are looking al
  Product.allProducts[productIndex1].views++;
  Product.allProducts[productIndex2].views++;
  Product.allProducts[productIndex3].views++;
}

//control+D selects similar words to edit all at once
//control+C copies the line you are on, Control+V from the same position pastes it on the line below

function handleClick(event) {
  //if the user clicks on the container and not the image
  if (event.target === imgContainer) {
    alert("please click one of the images, not the container");
    return; //this return stops the function
  }

  //check every single products "name" against the alt tag of the target, and increase the clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts[i]);
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      break; //stop the loop because we found our product
    }
  }

  totalClicks++;
  if (totalClicks === maxClicks) {
    alert("Thank you for voting!");
    imgContainer.removeEventListener("click", handleClick);
    renderChart();
    return;
  }
  //get three new images
  renderImages();
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

//chart
function renderChart() {
  const myChart = document.getElementById("chart");
  let labels = [];
  let viewsData = [];
  let clicksData = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    labels.push(Product.allProducts[i].name);
    viewsData.push(Product.allProducts[i].views);
    clicksData.push(Product.allProducts[i].clicks);
  }

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Views",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
  };

  new Chart(myChart, config);
}

renderImages();
