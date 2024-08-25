package com.springBoot.moviesReview;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,ObjectId>{
     
    @Query("{ 'name': ?0, 'password': ?1 }")
    Optional<User> validateUser(SignUp data);
}
