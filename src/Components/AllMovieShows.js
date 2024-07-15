import React, { useEffect, useState } from 'react';
import { getAPICall } from './APIMethods';
import './MovieList.css'

const AllMovieShows = () => {
  const [movieList, setMovieList] = useState([]);
  const [year, setYear] = useState(2012);

  const fetchMovies = () => {
      getAPICall(`https://api.themoviedb.org/3/discover/movie?api_key=5ed4c7ff1d925b6ee96d3feb04055f95&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`)
          .then((response) => {
              console.log("Res....", response);
              setMovieList(response.results);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  };

  useEffect(() => {
      fetchMovies();
  }, [year]); 
  const handleWheel = (event) => {
      event.preventDefault();
      
      if (event.deltaY >=100 && year < 2024) {
          // Scrolling down
          setYear((prevYear) => prevYear + 1); 
      } else if(year >1908){
          // Scrolling up
          setYear((prevYear) => prevYear - 1);
      }
      
  };

  useEffect(() => {
      window.addEventListener('wheel', handleWheel);
  }, []);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; // Adjust size as needed

    return (
        <div >
            
           <div className="movieList">
           <h1 style={{textAlign:"center"}}>Movies from {year}</h1>
           <div className='movieCardsMain'>
                {movieList.map(movie => (
                    
                    <div className="movieCard" key={movie.id}>
                         {movie.poster_path && (
                            <img  className='movieImage'
                                src={`${imageBaseUrl}${movie.poster_path}`} 
                                alt={movie.title} 
                            />
                        )}
                        <h5>{movie.title}</h5>
                       <div className='vote_count'> <p>Vote Average:{movie.vote_average}</p>
                       <p>Vote Count:{movie.vote_count}</p></div>
                       <p>Release Year : {movie.release_date}</p>

                        {/* <p>{movie.overview}</p> */}
                       
                    </div>
                ))}
            </div>
           </div>
        </div>
    );
};

export default AllMovieShows;
