import React, { useEffect, useState } from 'react'
import './AllMoviesShows.css'

const AllMovieShows = () => {
    const [allMovieList, setAllMovieList] = useState([]);
    const [allYearList, setAllYearList] = useState([])
    useEffect(() => {
        fetch("https://freetestapi.com/api/v1/movies ").then((res) => {
            return res.json();
        }).then((resp) => {
            setAllMovieList(resp);
            console.log("resp", resp)
            const tempYears = [];
            resp.map((movie)=>{
                  tempYears.push(movie.year)
                  
              }
            )
            const uniqueTempYears = [...new Set(tempYears)]
                  console.log("uniqueTempYears", uniqueTempYears);
            setAllYearList(uniqueTempYears.sort())

        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    // console.log("AllYearList", allYearList);

    // const year1994 = allMovieList?.filter(movie => movie.year == 1994);

    // console.log("year1994", year1994);
    

   
  return (
    <div className='allMovieMain'>
        <h1>All Movies List</h1>
    <div className="cardMain">
    {
      allYearList.map((year)=>{
        return(
        <>
          <h1>{year}</h1>
       <div className="cardSub">
       {allMovieList.map((movie)=>
            movie.year == year &&
            <div className="card">
              <img src={movie.poster} alt="" />
              <h2>{movie.title}</h2>
              <p>{movie.plot}</p>
            </div>
          )}
       </div>
        </>
        )})
     }
    </div>
    </div>
  )
}

export default AllMovieShows;