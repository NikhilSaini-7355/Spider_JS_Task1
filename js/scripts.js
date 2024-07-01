const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const savedDiv = document.querySelector('.saved-Div');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "6c966027";
const APP_key = "46d10d4f390db0a0ab6269a104499427";
// console.log(container)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery += e.target.querySelector('input').value;
  fetchAPI();
})

async function fetchAPI(){
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL); 
  const data = await response.json();
  generateHTML(data.hits)
  console.log(data);
  searchQuery = '';
  resultToSave = [];
}
function clicked(data)
{ if(searchQuery.indexOf(data)!=-1)
  {
      searchQuery = searchQuery.substring(0,searchQuery.indexOf(data)) + searchQuery.substring(searchQuery.indexOf(data)+data.length,searchQuery.length);
      console.log("hello      "+searchQuery);
  }
  else {
    searchQuery += (" " +data);
  }
}

function toggleMenu() {
  let navbar = document.getElementById("myNavbar");
  navbar.className = navbar.className === "navbar" ?
                     "navbar responsive" : "navbar";
}

let savedHTML = '';
let resultToSave = [];
function save(i)
{   let result = resultToSave[i];
    savedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `
    console.log(savedHTML);
    savedDiv.innerHTML = savedHTML;
}


function generateHTML(results){
  container.classList.remove('initial');
  let generatedHTML= ''; let i = -1;
  resultToSave = '';
  resultToSave = results;
  results.map(result => {
    i++;
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
          <div class="save-btn" onclick=save(${i})>Save</div>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `
  });
  
  searchResultDiv.innerHTML = generatedHTML;
}