// Spotify API credentials
const clientId = 'c186fe5232e44b5bb83c38cae9854309';
const clientSecret = '02dc65d227964029b877d63a4f7e614a';

// Variables to store token and API request
let token;
let request;

// Array of Spotify artist IDs
let ids = [
  '4zCH9qm4R2DADamUHMCa6O',
  '4PULA4EFzYTrxYvOVlwpiQ',
  '5sSzCxHtgL82pYDvx2QyEU',
  '5sSzCxHtgL82pYDvx2QyEU',
  '5wJ1H6ud777odtZl5gG507',
  '4svvMm4TQnkphZJfhLCzzv',
  '2nWYQRy7Ikh7CyWnvZZouD',
  '4YRxDV8wJFPHPTeXepOstw',
  '0oOet2f43PA68X5RxKobEy',
  '7qjJw7ZM2ekDSahLXPjIlN'
];

// URL for Spotify API request
let url = `https://api.spotify.com/v1/artists?ids=${ids.join(',')}`;

// Function to fetch an access token
const getToken = async () => {
  try {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    token = data.access_token;
    console.log(token);
    urlAndRequest();
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

// Function to set up the URL and request headers
const urlAndRequest = () => {
  if (!token) {
    document.write("Token not available yet.");
    return;
  }
  request = new Request(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  fetchData();
}

// Function to fetch artist data
const fetchData = async () => {
  try {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    // Get the data container element
    const dataContainer = document.getElementById("assignment");

    // Loop through artists and create elements
    data.artists.forEach(artist => {
      if (artist.images.length > 0) {
        const artistDiv = document.createElement("div");
        artistDiv.classList.add("artist");

        // Create and configure the artist image element
        const artistImage = document.createElement("img");
        artistImage.src = artist.images[2].url;
        artistImage.alt = artist.name;

        // Create and configure the artist name element
        const artistname = document.createElement("h2");
        artistname.textContent = `Artist Name: ${artist.name}`;

        // Create and configure the artist genres element
        const artistgenres = document.createElement("p");
        artistgenres.textContent = `Artist Genres: ${artist.genres}`;

        // Append elements to the artistDiv
        artistDiv.appendChild(artistImage);
        artistDiv.appendChild(artistname);
        artistDiv.appendChild(artistgenres);

        // Append artistDiv to the dataContainer
        dataContainer.appendChild(artistDiv);
      }
    });
  } catch (error) {
    document.write("Error fetching data:", error);
  }
}

// Call the getToken function to start the process
getToken();
