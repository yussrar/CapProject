import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors"
import fetch from "node-fetch";

const port = process.env.PORT || 3000; 
// Define a simple route

app.use(cors());
app.use(bodyParser.json());




//For getting the data from the movie db api
const url = 'https://api.themoviedb.org/3/trending/tv/day';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjEwYTIzN2Q4NGYyNWNmYjQ0Zjc5Y2Y5NzJkNWI1MiIsInN1YiI6IjY0YzVlY2IxNjNhNjk1MDBlNmI2ZGU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GqiMVxRUhX4NqQtmVBJDools-4KTceBJTuWbRBsrWqE'
  }
};

app.get('/api/trendingTVShows', async (req, res) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const trendingTVShows = data.results;
    res.json(trendingTVShows); // Send the data as a JSON response
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    res.status(500).json({ error: 'Error fetching trending TV shows' });
  }
});

app.get('/api/searchTVShows', async (req, res) => {
  const { query } = req.query;

  const searchUrl = `https://api.themoviedb.org/3/search/tv?query=${query}`;

  try {
    const response = await fetch(searchUrl, options);
    const data = await response.json();
    const searchResults = data.results;
    res.json(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Error fetching search results' });
  }
});

//for genre list
app.get('/api/genres', async (req, res) => {
  const GenreListUrl =  'https://api.themoviedb.org/3/genre/tv/list';

  try {
    const response = await fetch(GenreListUrl, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Genre results:', error);
    res.status(500).json({ error: 'Error fetching Genre results' });
  }
  
});

//getting genre id and sending list based on genre
app.post('/api/selectedGenre/:genreId', async (req, res) => {
  const genreId = req.params.genreId;

  const tvShowsByGenreUrl = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}`;

  try {
    const response = await fetch(tvShowsByGenreUrl, options);
    const data = await response.json();
    const tvShowsByGenre = data.results;
    res.json(tvShowsByGenre);
  } catch (error) {
    console.error('Error fetching TV shows by genre:', error);
    res.status(500).json({ error: 'Error fetching TV shows by genre' });
  }
});

//getting show details 
app.post('/api/showDetails', async (req, res) => {
  try {
    const { tvShowId, tvShowName } = req.body;


    // Send a request to the Movie DB API using the tvShowId
    const movieDBApiUrl = `https://api.themoviedb.org/3/tv/${tvShowId}`;
    const movieDBResponse = await fetch(movieDBApiUrl, options);
    const movieDBData = await movieDBResponse.json();

    // Send a request to YouTube using the tvShowName
    const apiKey2 = 'AIzaSyBbT9Z5Sjj4HykHFjYEWqY8rE-JjlOurmU'; // Replace with your YouTube API key
    const showTitle = encodeURIComponent(tvShowName);
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey2}&type=video&part=snippet&q=${showTitle} trailer&maxResults=3`;
    const youtubeResponse = await fetch(youtubeApiUrl, options);
    const youtubeData = await youtubeResponse.json();

    //sending response from both API
    res.json({
      movieDB: movieDBData,
      youtube: youtubeData,
    });

  } catch (error) {
    console.error('Error fetching TV shows or YouTube videos:', error);
    res.status(500).json({ error: 'Error fetching TV shows or YouTube videos' });
  }
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
