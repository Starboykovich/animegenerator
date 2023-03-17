'use strict'

const apiKey = 'your_api_key_here'; // Replace with your Jikan API key

// Generate three random anime IDs between 1 and 10000
function generateRandomAnimeIds() {
  const animeIds = [];
  while (animeIds.length < 3) {
    const id = Math.floor(Math.random() * 10000) + 1;
    if (!animeIds.includes(id)) {
      animeIds.push(id);
    }
  }
  return animeIds;
}

// Display the data for a single anime title
function displayAnimeTitle(anime) {
  const title = anime.title;
  const synopsis = anime.synopsis;
  const coverImageUrl = anime.image_url;
  const animeDiv = document.createElement('div');
  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  animeDiv.appendChild(titleElement);
  const synopsisElement = document.createElement('p');
  synopsisElement.textContent = synopsis;
  animeDiv.appendChild(synopsisElement);
  const coverImageElement = document.createElement('img');
  coverImageElement.src = coverImageUrl;
  animeDiv.appendChild(coverImageElement);
  const animeContainer = document.getElementById('anime-container');
  animeContainer.appendChild(animeDiv);
}

// Handle the "Generate Random Anime" button click
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', event => {
  // Clear any existing anime titles from the screen
  const animeContainer = document.getElementById('anime-container');
  animeContainer.innerHTML = '';

  // Generate three random anime IDs and make a GET request for each ID
  const animeIds = generateRandomAnimeIds();
  const animePromises = animeIds.map(id => {
    const url = `https://api.jikan.moe/v3/anime/${id}`;
    return fetch(url).then(response => response.json());
  });

  // Wait for all requests to complete, then display the results
  Promise.all(animePromises)
    .then(animeData => {
      // Display the data for each anime on the screen
      animeData.forEach(anime => {
        displayAnimeTitle(anime);
      });
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
});