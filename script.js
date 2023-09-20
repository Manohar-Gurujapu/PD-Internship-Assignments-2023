const token = 'BQAJV_ZJ0XXTe-USb-TNyRlRsL1bO8f4XdEekbUu_usuVUKVcsjoHs8S4x56EsEQ39USXGMNZOw7P636mL617nohzDOFZd9k5hwFGVzyI7Hwee86JpT82nn8i-h5G_tQ7zqCsdGvN7yXeRRO0Tm8-Gs34seLuqlc8t0eYA7dMzyfLGRnRn5NXzCMU99N-hU2NCqKJXuSTS9yp_KNQW2tUGzXt1h1wabOUaDbClEdqZ-FkDkzS4arFHpUHmwKa0NApvn09AWbR5EK8nqtx2oUTVpj';
const artistIds = [
  '2GoeZ0qOTt6kjsWW4eA6LS',
  '7hHDO4bJGlEaEHlY2lj1eZ',
  '4YRxDV8wJFPHPTeXepOstw',
  '7uIbLdzzSEqnX0Pkrb56cR',
  '7n2wHs1TKAczGzO7Dd2rGr',
  '0C8ZW7ezQVs4URX5aX7Kqx',
  '0oOet2f43PA68X5RxKobEy',
  '2o4R2rK7FetH40HTv0SUWl',
  '00sCATpEvwH48ays7PlQFU',
  '4zCH9qm4R2DADamUHMCa6O'
];

const dataContainer = document.getElementById("data-container");

async function fetchArtistData(artistId) {
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await fetch(artistUrl, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return null;
  }
}

async function getData() {
  try {
    const artistDataPromises = artistIds.map(fetchArtistData);
    const artistDataArray = await Promise.all(artistDataPromises);

    const artistList = document.createElement("ul");

    artistDataArray.forEach(artist => {
      if (artist) {
        const table=document.getElementById("artist-table")
        const listItem = document.createElement("tr");
        listItem.innerHTML = `
       <td> <img src="${artist.images[0].url}" alt="${artist.name}'s Image"></td>
         <td> <h3>Artist Name: ${artist.name}</h3></td>
          <td><p>Follower: ${artist.followers.total}</p></td>
          <td><p>Music Kind: ${artist.genres.join(', ')}</p></td>
         <td> <p>Popularity: ${artist.popularity}</p></td>
          
        `;
        table.appendChild(listItem);
      }
    });

    dataContainer.appendChild(artistList);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();
