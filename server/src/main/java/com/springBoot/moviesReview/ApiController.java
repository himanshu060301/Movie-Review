package com.springBoot.moviesReview;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1")
public class ApiController {

	@Autowired
	private MovieService movieService;

    @Autowired 
	private ReviewService reviewService;
    
    @GetMapping("/movies")
	public ResponseEntity<List<Movie>> getAllMovies() {	
		return new ResponseEntity<List<Movie>>(movieService.allMovies(),HttpStatus.OK);
	}

	@GetMapping("/movies/{id}")
	public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String id) {
		return new ResponseEntity<Optional<Movie>>(movieService.singleMovie(id),HttpStatus.OK);
    }
	
	@PostMapping("/reviews") 
	public ResponseEntity<Review> createReview(@RequestBody Map<String,String> payload) { 
		return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"),
				payload.get("imdbId")),HttpStatus.CREATED); 
	} 
}
