package com.springBoot.moviesReview;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="watchlist")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Watchlist {

    @Id
	private ObjectId id;
    private String imdbId;
    private String title;
    private List<String> backdrops;
    private List<String> genres;
    
    public Watchlist(String imdbId, String title, List<String> backdrops, List<String> genres) {
        this.imdbId = imdbId;
        this.title = title;
        this.backdrops = backdrops;
        this.genres = genres;
    }
}
