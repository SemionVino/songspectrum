import { cors } from "hono/cors";

const mainRoutes = (router) => {
  router.use(
    "/api/*",
    cors({
      origin: "http://localhost:3000", // Your frontend's URL
      allowMethods: ["GET", "POST"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );
  //--------------------------------------------------------
  router.get("/api/artist/:search", async (c) => {
    try {
      const searchTerm = c.req.param("search").toLowerCase();
      const url = `http://api.genius.com/search?q=${encodeURIComponent(searchTerm)}&access_token=${Bun.env.CLIENT_ACCESS_TOKEN}`;

      const response = await fetch(url);
      const data = await response.json();

      // Extract artist information
      let artists = data.response.hits.map((hit) => {
        return { name: hit.result.primary_artist.name, id: hit.result.primary_artist.id };
      });

      // Using a Map to filter out duplicates
      artists = data.response.hits.map((hit) => {
        return { name: hit.result.primary_artist.name, id: hit.result.primary_artist.id };
      });
      //Remove all entries that don't include the search string
      let filteredArtists = artists.filter((artist) => artist.name.toLowerCase().includes(searchTerm));

      let uniqueArtists = new Map(filteredArtists.map((artist) => [artist.id, artist]));
      uniqueArtists = Array.from(uniqueArtists.values());

      return c.json({
        success: true,
        data: uniqueArtists,
      });
    } catch (error) {
      console.error("Error:", error);
      return c.json({ error: "An error occurred" }, 500);
    }
  });
};
export default mainRoutes;
