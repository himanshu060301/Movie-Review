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

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();
        const rev = revText.current;

        try
        {
            const response = await axios.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});
            const updatedReviews = [...reviews, {body:rev.value}];
            
            setReviews(updatedReviews);
            console.log('updated');
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }

  return (
    <Container>
        <Row>
            <Col><h3 style={{ color: '#0dcaf0'}} >Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col key={movie?.imdbId}>
                <img src={movie?.poster} alt=""/>
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
                        <Row>
                            <Col><hr /></Col>
                        </Row>
                    </>
                }
                {reviews?.map((r) => {
                    //console.log(r._id+"vasj");
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
        <Row>
            <Col><hr /></Col>
        </Row>        
    </Container>
  )
}

export default Reviews