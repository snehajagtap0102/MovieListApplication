import React, { useEffect, useRef, useState } from 'react';
import { getAPICall } from './APIMethods';
import './MovieList.css';

const AllMovieShows = () => {
  const [moviesByYear, setMoviesByYear] = useState({});
  const [AllMovies, setAllMovies] = useState({})
  const [loading, setLoading] = useState(false);
  const year2012Ref = useRef(null);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);
  useEffect(() => {
    if (!loading && year2012Ref.current) {
      year2012Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading]);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      {loading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        Object.keys(moviesByYear).map((year) => (
          <div key={year} className="movieList" id={year === '2012' ? 'year-2012' : ''} ref={year === '2012' ? year2012Ref : null}>
            <h1 style={{ textAlign: "center" }}>Movies from {year}</h1>
            <div className='movieCardsMain'>
              {moviesByYear[year].map(movie => (
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
        ))
      )}
    </div>
  );
};

export default AllMovieShows;
