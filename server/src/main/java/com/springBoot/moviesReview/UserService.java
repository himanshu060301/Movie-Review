package com.springBoot.moviesReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired 
    private UserRepository userRepository;

    @Autowired 
    private MongoTemplate mongoTemplate;
    
    @Autowired 
    private PasswordEncoder passwordEncoder; 

    public Boolean userSignUp(SignUp data){
		try {
			String encodedPassword = passwordEncoder.encode(data.getPassword());
	    	Boolean isUserExist=validateUser(data.getEmail(),data.getPassword());
	        
	    	if(isUserExist) return true;
	        userRepository.save(new User(data.getName(),data.getEmail(),encodedPassword));
	        
		} catch (Exception e) {
			System.out.println("Database error occurred while signing up user with email.");
		}
		return false;
    }

    public Boolean validateUser(String mail, String password){
    	try {
    		Query query = new Query();
            query.addCriteria(Criteria.where("email").is(mail));
            query.fields().include("password"); 

            User user = mongoTemplate.findOne(query, User.class);
            return user != null ? passwordEncoder.matches(password,user.getPassword()) : false;

		} catch (Exception e) {
			System.out.println("Database error occurred while validate the user.");
		}
        return false;       
    }
}
