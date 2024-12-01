import './App.css';
import {useState, useEffect, useContext} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import WatchList from './components/watchList/WatchList';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import { LoginContext } from './context/LoginContext';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const loginContext=useContext(LoginContext);
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const getMovies = async () =>{
    try
    {
      const response = await axios.get(`${API_BASE_URL}/api/v1/movies`);
      setMovies(response.data);
    }catch(err){
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try 
    {
      const response = await axios.get(`${API_BASE_URL}/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.review);
    }catch (error){
      console.error(error);
    }
  }

  const handleUserLogin=async()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/user`, {
        withCredentials: true, // Include cookies or authentication tokens
      });

      console.log("User Authenticated:" + response.data.isAuthenticated);
      (response.data.isAuthenticated ) ? loginContext.setIsActive(true) : loginContext.setIsActive(false);
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Error in Login !!');
    } 
  }

  useEffect(() => {
    handleUserLogin();
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
              <Route path="/login" element={<Login />} ></Route>
              <Route path="/watchList" element={<WatchList />} ></Route>
              <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;