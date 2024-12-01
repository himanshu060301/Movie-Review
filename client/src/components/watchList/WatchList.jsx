import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './watchlist.css';

const WatchList = () => {
  const [movies,setMovies]= useState();
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const getWatchlistMovies= async()=>{
    const response = await axios.get(`${API_BASE_URL}/api/v1/watchlist`);
    console.log(response.data);
    setMovies(response.data);
  }

  useEffect(()=>{
    getWatchlistMovies();
  },[])

  return (
    <div className="movie-container">
        {
          movies?.map((movie)=>{
            return(
              <div className="movie-cards">
                <img className="img-style" src={movie.backdrops[0]} alt="" />
                <h4>{movie.title}</h4>
                {/* <h4>{movie.genres?.join(', ')}</h4> */}
              </div>    
          )})
        }
    </div>
  )
}

export default WatchList