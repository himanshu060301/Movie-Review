package com.springBoot.moviesReview;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.data.mongodb.core.MongoTemplate; 
import org.springframework.data.mongodb.core.query.Criteria; 
import org.springframework.data.mongodb.core.query.Update; 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service 
public class ReviewService {

	@Autowired 
	private ReviewRepository reviewRepository;
	
	@Autowired 
	private MongoTemplate mongoTemplate;
	
	@Transactional
	public Review createReview(String reviewBody, String imdbId){
		Review review = null;
		try {
			review=reviewRepository.save(new Review(reviewBody));
			
			mongoTemplate.update(Movie.class)
			.matching(Criteria.where("imdbId").is(imdbId)) 
			.apply(new Update().push("review").value(review))
			.first();
		
		} catch (Exception e) {
			System.out.println("Database error occurred while save the movie review.");
		}
		
		return review; 
	} 
}
 