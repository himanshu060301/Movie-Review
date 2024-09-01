import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const WatchList = () => {
  
  const [movies,setMovies]= useState();

  const getWatchlistMovies= async()=>{
    const response = await axios.get("/api/v1/watchlist");
    console.log(response.data);
    setMovies(response.data);
  }

  useEffect(()=>{
    getWatchlistMovies();
  },[])

  return (
    <div>
        {
          movies?.map((movie)=>{
            return(
            <Paper>
              <div className="movie-poster">
                  <img src={movie.backdrops[0]} alt="" />
              </div>    
            </Paper>
          )})
        }
    </div>
  )
}

export default WatchList