import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [moviesByYear, setMoviesByYear] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://freetestapi.com/api/v1/movies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const movieData = await response.json();

        // Group movies by release_year
        const groupedMovies = {};
        movieData.forEach(movie => {
          const year = movie.release_year;
          if (year) {
            if (!groupedMovies[year]) {
              groupedMovies[year] = [];
            }
            groupedMovies[year].push(movie);
          }
        });

        setMoviesByYear(groupedMovies);
      } catch (error) {
        console.error('Error fetching and processing data:', error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      {Object.keys(moviesByYear).map(year => (
        <div key={year}>
          <h2>{year}</h2>
          <ul>
            {moviesByYear[year].map(movie => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
