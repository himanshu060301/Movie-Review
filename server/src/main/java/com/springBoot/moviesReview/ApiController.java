package com.springBoot.moviesReview;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = {"https://movie-review-4vb0.onrender.com", "http://localhost:3000"})
@RequestMapping("/api/v1")
public class ApiController {

	@Autowired
	private MovieService movieService;

    @Autowired 
	private ReviewService reviewService;

	@Autowired
	private UserService userService;

	@Autowired
	private WatchlistService watchlistService;
    
	private SignUp signUp; 

	@PostMapping("/signUp") 
	public ResponseEntity<User> userSignUp(@RequestBody SignUp response){
		signUp = new SignUp();
		signUp.setName(response.getName());
		signUp.setEmail(response.getEmail());
		signUp.setPassword(response.getPassword());
		return new ResponseEntity<User>(userService.userSignUp(signUp),HttpStatus.CREATED);
	}

	@GetMapping("/login")
	public ResponseEntity<User> validateUser(@RequestParam String email, @RequestParam String password){
		signUp = new SignUp(email,password);
		return new ResponseEntity<User>(userService.validateUser(signUp),HttpStatus.OK);
		
	}

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

	@PostMapping("/addToWatchlist") 
	public ResponseEntity<Watchlist> addToWatchlist(@RequestBody Map<String,String> payload) { 
		return new ResponseEntity<Watchlist>(watchlistService.addToWatchlist(payload.get("imdbId"),
				payload.get("title"), payload.get("backdrops"), payload.get("genres")),HttpStatus.CREATED); 
	} 

	@GetMapping("/watchlist") 
	public ResponseEntity<List<Watchlist>> getWatchlistMovies() {	
		return new ResponseEntity<List<Watchlist>>(watchlistService.getWatchlistMovies(),HttpStatus.OK);
	}
}
