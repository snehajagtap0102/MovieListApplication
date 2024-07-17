import React from 'react'
import { getAPICall } from './APIMethods';

const MovieTabs = () => {

    const fetchMovies = async (year) => {
        try {
          const response = await getAPICall(`https://api.themoviedb.org/3/discover/movie?api_key=5ed4c7ff1d925b6ee96d3feb04055f95&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`);
          if(response.success == true){
            console.log("");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
      };
  return (
    <div>MovieTabs</div>
  )
}

export default MovieTabs