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

	public String getImdbId() {
		return imdbId;
	}

	public void setImdbId(String imdbId) {
		this.imdbId = imdbId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<String> getBackdrops() {
		return backdrops;
	}

	public void setBackdrops(List<String> backdrops) {
		this.backdrops = backdrops;
	}

	public List<String> getGenres() {
		return genres;
	}

	public void setGenres(List<String> genres) {
		this.genres = genres;
	}
}
