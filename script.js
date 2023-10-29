// API key for the Superhero API
const apiKey = "1216454192525968";

// Get the search form, search input, search results, and superhero details elements from the DOM
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const superheroDetails = document.getElementById("superhero-details");
const superheroName = document.getElementById("superhero-name");
const superheroImage = document.getElementById("superhero-image");
const powerstats = document.getElementById("powerstats");
const biography = document.getElementById("biography");
const appearance = document.getElementById("appearance");
const connections = document.getElementById("connections");

// Add an event listener to the search form to fetch all superheroes when the form is submitted
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchText = searchInput.value;
  fetchAllSuperheroes(searchText);
});

// Function to fetch all superheroes from the API
const fetchAllSuperheroes = async (searchText) => {
  const url = `https://www.superheroapi.com/api.php/${apiKey}/search/${searchText}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.response === "success") {
      showSearchResults(data.results);
      searchResults.style.display = "block";
    } else {
      searchResults.innerHTML = "<li>No results found.</li>";
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to show the search results in the DOM
const showSearchResults = (results) => {
  searchResults.innerHTML = "";
  results.forEach((result) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const name = document.createElement("span");
    img.src = result.image.url;
    name.textContent = result.name;
    li.appendChild(img);
    li.appendChild(name);
    li.addEventListener("click", () => {
      searchResults.style.display = "none";
      showSuperheroDetails(result);
    });
    searchResults.appendChild(li);
  });
};

// Function to show the details of a superhero in the DOM
const showSuperheroDetails = (superhero) => {
  superheroName.textContent = superhero.name;
  superheroImage.src = superhero.image.url;
  powerstats.innerHTML = "";
  for (const [key, value] of Object.entries(superhero.powerstats)) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    powerstats.appendChild(li);
  }
  biography.innerHTML = "";
  for (const [key, value] of Object.entries(superhero.biography)) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    biography.appendChild(li);
  }
  appearance.innerHTML = "";
  for (const [key, value] of Object.entries(superhero.appearance)) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    appearance.appendChild(li);
  }
  connections.innerHTML = "";
  for (const [key, value] of Object.entries(superhero.connections)) {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    connections.appendChild(li);
  }
  superheroDetails.style.display = "block";
  searchResults.style.display = "none";
};

// Add an event listener to the superhero details element to hide the details when clicked
superheroDetails.addEventListener("click", (event) => {
  if (event.target === superheroDetails) {
    superheroDetails.style.display = "none";
    searchResults.style.display = "block";
  }
});
