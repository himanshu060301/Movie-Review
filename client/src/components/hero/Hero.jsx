import React, { useContext } from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay,faAdd, faSquarePlus} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';


const Hero = ({movies}) => {
    const loginState=useContext(LoginContext);
    const navigate = useNavigate();
    
    function reviews(movieId){
        loginState.isActive?navigate(`/Reviews/${movieId}`):navigate('/login');
    }

    const addToWatchlist = async (movieId,title,backdrops,genres) =>{     
        const genresString = genres.join(",");
        const backdropsString = backdrops.join(",");
        try
        {
            const response = await axios.post("/api/v1/addToWatchlist",{imdbId:movieId, title:title, backdrops:backdropsString, genres:genresString});
            if(response) 
                alert("Movie added to watchlist successfully!");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className ='movie-carousel-container'>
            <Carousel>
                {
                    movies?.map((movie) =>{
                        return(
                            <Paper key={movie.imdbId}>
                                <div className = 'movie-card-container'>
                                    <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <img src={movie.poster} alt="" />
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                            <div className="movie-buttons-container">
                                                <div className="play-button-icon-container">
                                                    <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                        <FontAwesomeIcon className="play-button-icon"
                                                            icon = {faCirclePlay}
                                                        />
                                                    </Link>
                                                    <FontAwesomeIcon className="add-button-icon"
                                                        icon = {faSquarePlus} onClick={()=>addToWatchlist(movie.imdbId, movie.title, movie.backdrops, movie.genres)}
                                                    />
                                                </div>
                                                
                                                <div className="movie-review-button-container">
                                                    <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Hero