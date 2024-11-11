package com.springBoot.moviesReview;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
	@Id
	private ObjectId id;
	private String imdbId;
	private String title;
	private String releaseDate;
	private String trailerLink;
	private String poster;
	private List<String> genres;
	private List<String> backdrops;
	@DBRef(lazy = false)
	private List<Review> review;
	
	public Movie(String imdbId, String title, String releaseDate, String trailerLink, String poster,
			List<String> genres, List<String> backdrops, List<Review> review) {
		this.imdbId = imdbId;
		this.title = title;
		this.releaseDate = releaseDate;
		this.trailerLink = trailerLink;
		this.poster = poster;
		this.genres = genres;
		this.backdrops = backdrops;
		this.review = review;
	}
}
