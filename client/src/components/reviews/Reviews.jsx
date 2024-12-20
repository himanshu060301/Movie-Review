import React from 'react';
import {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const navigate = useNavigate(); 
    
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();
        const rev = revText.current;

        try
        {
            const response = await axios.post(`${API_BASE_URL}/api/v1/reviews`,{reviewBody:rev.value,imdbId:movieId});
            const updatedReviews = [...reviews, {body:rev.value}];
            
            setReviews(updatedReviews);
            console.log('updated');
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }

  return (
    <Container style={{maxHeight: '90vh', overflow: 'hidden' }}>
        <Row>
            <Col><h3 style={{ color: '#0dcaf0'}} >Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col key={movie?.imdbId}>
                <img src={movie?.poster} alt="" style={{height: "80%", width: "80%"}}/>
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                            <ReviewForm 
                                handleSubmit={addReview} 
                                revText={revText} 
                                labelText="Write a Review?" 
                                placeholder="Enter your review here..."
                            />
                            </Col>
                        </Row>
                    </>
                }
                {reviews?.map((r) => {
                    return(
                        <div key={r._id}>
                            <Row >
                                <Col style={{color:'white'}}>* {r.body}</Col>
                            </Row>
                            <Row>
                                <Col><hr /></Col>
                            </Row>                                
                        </div>
                    )
                })}
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews