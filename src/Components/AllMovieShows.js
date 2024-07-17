import React, { useEffect, useRef, useState } from 'react';
import { getAPICall } from './APIMethods';
import './MovieList.css';

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const AllMovieShows = () => {
  const [moviesByYear, setMoviesByYear] = useState({
    2012: []
  });
  const [filteredMovies, setFilteredMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // Track active filter
  const year2012Ref = useRef(null);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  const fetchMovies = async (year) => {
    try {
      const response = await getAPICall(`https://api.themoviedb.org/3/discover/movie?api_key=5ed4c7ff1d925b6ee96d3feb04055f95&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`);
      return response.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchAllMovies = async () => {
    setLoading(true);
    const moviesByYearTemp = {};
    for (let year = 1990; year <= 2024; year++) {
      const movies = await fetchMovies(year);
      moviesByYearTemp[year] = movies;
    }
    setMoviesByYear(moviesByYearTemp);
    setFilteredMovies(moviesByYearTemp);
    setLoading(false);
  };

  const filterData = (genreId) => {
    setActiveFilter(genreId); // Set active filter when button is clicked
    if (genreId === "all") {
      setFilteredMovies({ ...moviesByYear });
    } else {
      const filteredData = {};
      for (const year in moviesByYear) {
        const yearMovies = moviesByYear[year].filter(movie => movie.genre_ids.includes(genreId));
        if (yearMovies.length > 0) {
          filteredData[year] = yearMovies;
        }
      }
      setFilteredMovies(filteredData);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  useEffect(() => {
    if (moviesByYear[2012].length > 0 && year2012Ref.current) {
      year2012Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [moviesByYear]);

  return (
    <div>
      <div className="header">
        <div className="logo">MOVIFLIX</div>
        <div className="filter-buttons">
          <button className={`filterButton ${activeFilter === "all" ? "active" : ""}`} onClick={() => filterData("all")}>All Movies</button>
          {genres.map(genre => (
            <button key={genre.id} className={`filterButton ${activeFilter === genre.id ? "active" : ""}`} onClick={() => filterData(genre.id)}>{genre.name}</button>
          ))}
        </div>
      </div>
      <div className='main'>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        ) : (
          Object.keys(filteredMovies).length > 0 ? (
            Object.keys(filteredMovies).map((year) => (
              filteredMovies[year].length > 0 ? (
                <div key={year} className="movieList" id={year === '2012' ? 'year-2012' : ''} ref={year === '2012' ? year2012Ref : null}>
                  <h2 className="movie-year">{year}</h2>
                  <div className='movieCardsMain'>
                    {filteredMovies[year].map(movie => (
                      <div className="movieCard" key={movie.id}>
                        {movie.poster_path && (
                          <img className='movieImage'
                            src={`${imageBaseUrl}${movie.poster_path}`}
                            alt={movie.title}
                          />
                        )}
                        <h5>{movie.title}</h5>
                        <div className='vote_count'>
                          <p>Vote Average: {movie.vote_average}</p>
                          <p>Vote Count: {movie.vote_count}</p>
                        </div>
                        <p>Release Year: {movie.release_date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            ))
          ) : (
            <div className="no-movies">
              <h1 className="">No movies available</h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllMovieShows;
