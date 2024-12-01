package com.springBoot.moviesReview;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service 
public class WatchlistService {

    @Autowired 
	private WatchlistRepository watchlistRepository;

    public Watchlist addToWatchlist(String imdbId, String title, String backdropsString, String genreString){
        List<String> genres = Arrays.stream(genreString.split(","))
        .collect(Collectors.toList());

        List<String> backdrops = Arrays.stream(backdropsString.split(","))
        .collect(Collectors.toList());

        return watchlistRepository.insert(new Watchlist(imdbId,title,backdrops,genres));
    }
    
    public List<Watchlist> getWatchlistMovies() {
    	List<Watchlist> allMovies = watchlistRepository.findAll();

        Map<String, Watchlist> movieMap = new LinkedHashMap<>();
        for (Watchlist movie : allMovies) {
            movieMap.put(movie.getTitle(), movie); 
        }

        return new ArrayList<>(movieMap.values());
	}

}
