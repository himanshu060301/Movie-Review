import React, { useContext, useState } from 'react';
import './Hero.css';
import Carousel from 'react-bootstrap/Carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faSquarePlus} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Hero = ({movies}) => {
    const loginState = useContext(LoginContext);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    function reviews(movieId) {
        loginState.isActive ? navigate(`${API_BASE_URL}/Reviews/${movieId}`) : navigate('/login');
    }

    const addToWatchlist = async (movieId, title, backdrops, genres) => {
        const genresString = genres.join(",");
        const backdropsString = backdrops.join(",");
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/addToWatchlist`, {
                imdbId: movieId, 
                title: title, 
                backdrops: backdropsString, 
                genres: genresString
            });
            if (response) {
                setAlert({ type: 'success', message: 'Movie added to watchlist successfully!' });
                setTimeout(() => setAlert(null), 3000); 
            }
        } catch (err) {
            console.log(err);
            setAlert({ type: 'error', message: 'Failed to add movie to watchlist.' });
            setTimeout(() => setAlert(null), 3000); 
        }
    }

    return (
        <div className='movie-carousel-container'>
            {alert && (
                <Alert 
                    severity={alert.type} 
                    className='custom-alert'
                >
                    {alert.message}
                </Alert>
            )}
            <Carousel>
                {movies?.map((movie) => (
                    <Carousel.Item>
                    <Paper key={movie.imdbId}>
                        <div className='movie-card-container'>
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
                                                <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                            </Link>
                                            <FontAwesomeIcon 
                                                className="add-button-icon" 
                                                icon={faSquarePlus} 
                                                onClick={() => addToWatchlist(movie.imdbId, movie.title, movie.backdrops, movie.genres)}
                                            />
                                        </div>
                                        <div className="movie-review-button-container">
                                            <Button variant="info" onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                    </Carousel.Item>
                ))}
                
            </Carousel>
        </div>
    )
}

export default Hero;
