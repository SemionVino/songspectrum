import { Hono } from "hono";
import fetch from "node-fetch";
import { getLyrics, getSong } from "genius-lyrics-api";
import mainRoutes from "./routers/mainRouter";
const app = new Hono();

mainRoutes(app);
//-------------------------------------------------
async function fetchArtistId(artistName) {
  const query = encodeURIComponent(artistName);
  const url = `https://api.genius.com/search?q=${query}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CLIENT_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch artist");
  }

  const data = await response.json();
  const artist = data.response.hits.find((hit) => hit.result.primary_artist.name.toLowerCase() === artistName.toLowerCase());

  return artist ? artist.result.primary_artist.id : null;
}

//-------------------------------------------------
async function fetchSongsByArtist(artistId, page) {
  let url = `https://api.genius.com/artists/${artistId}/songs?per_page=50&sort=popularity`;
  if (page) url += `&page=${page}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CLIENT_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  const data = await response.json();
  return data.response.songs;
}
//-------------------------------------------------

//--------------------------------------------------------------------
async function getSongIds(artistId) {
  const songs = [];
  let i = 0;
  while (songs.length % 50 == 0) {
    const songsWave = await fetchSongsByArtist(artistId, i);
    songs.push(...songsWave);
    if (songsWave.length < 50) break;
    i++;
  }
  return songs.map((e) => e.id);
}
//--------------------------------------------------------------------

//--------------------------------------------------------------------
app.get("/songs/:artist", async (c) => {
  const artistName = c.req.param("artist").toLowerCase();
  const options = {
    apiKey: CLIENT_ACCESS_TOKEN,
    title: "werewolf",
    artist: artistName,
    optimizeQuery: true,
  };

  getLyrics(options).then((lyrics) => console.log(lyrics.replace(/\[.*?\]/g, "")));
});

//--------------------------------------------------------------------
export default {
  port: 3001,
  fetch: app.fetch,
};
