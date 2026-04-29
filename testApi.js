async function testWatchlist() {
  const url = 'https://app-260421214011.azurewebsites.net/api';
  
  let res = await fetch(`${url}/Artwork/watchlist?artworkId=1`, { method: 'DELETE' });
  console.log(`DELETE /Artwork/watchlist?artworkId=1 -> ${res.status}`);
}

testWatchlist();
