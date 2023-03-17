'use strict'

const clientId = '25734dce5f209dfc7d6a0589710b95c2'; // Replace with your MyAnimeList API client ID
const clientSecret = 'bdd820c4b601b4195aa4408edceece1b16a057b0c118554834e47ece26e9aa30'; // Replace with your MyAnimeList API client secret

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
    const url = `https://api.myanimelist.net/v2/anime/${id}`;
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${accessToken}`
    });
    return fetch(url, { headers: headers }).then(response => response.json());
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

// Request an access token from the MyAnimeList API
const url = 'https://api.myanimelist.net/v2/oauth2/token';
const data = new URLSearchParams({
  'grant_type': 'client_credentials',
  'client_id': clientId,
  'client_secret': clientSecret
});
fetch(url, { method: 'POST', body: data })
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token;
    // Store the access token for use in the "Generate Random Anime" button click handler
  })
  .catch
