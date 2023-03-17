'use strict'

// Replace CLIENT_ID and CLIENT_SECRET with your MyAnimeList API credentials
const CLIENT_ID = '25734dce5f209dfc7d6a0589710b95c2';
const CLIENT_SECRET = 'bdd820c4b601b4195aa4408edceece1b16a057b0c118554834e47ece26e9aa30';

// Replace REDIRECT_URI with your application's Redirect URL
const REDIRECT_URI = 'https://starboykovich.github.io/animegenerator/';

// Initialize the OAuth2 client
const auth = createOAuth2Client({
  client: {
    id: CLIENT_ID,
    secret: CLIENT_SECRET,
  },
});

// Get three random anime titles from the MyAnimeList API
const getAnime = async () => {
  try {
    // Authenticate the OAuth2 client
    await auth.getToken();

    // Make a request to the MyAnimeList API to get three random anime titles
    const response = await fetch('https://api.myanimelist.net/v2/anime?sort=random&limit=3', {
      headers: {
        Authorization: `Bearer ${auth.credentials.access_token}`,
      },
    });

    // Parse the response as JSON
    const data = await response.json();

    // Display the anime titles on the screen
    data.data.forEach((anime) => {
      const title = anime.title;
      const synopsis = anime.synopsis;
      const imageUrl = anime.main_picture.large;

      // Create a new HTML element for the anime title
      const animeElement = document.createElement('div');
      animeElement.classList.add('anime');

      // Create a new HTML element for the anime image
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;

      // Create a new HTML element for the anime title and synopsis
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;

      const synopsisElement = document.createElement('p');
      synopsisElement.textContent = synopsis;

      // Add the image, title, and synopsis elements to the anime element
      animeElement.appendChild(imageElement);
      animeElement.appendChild(titleElement);
      animeElement.appendChild(synopsisElement);

      // Add the anime element to the document body
      document.body.appendChild(animeElement);
    });
  } catch (error) {
    console.error(error);
  }
};

// Call the getAnime function to display the anime titles on the screen
getAnime();
