package com.springBoot.moviesReview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired 
    private UserRepository userRepository;

    @Autowired 
    private MongoTemplate mongoTemplate;

    public Boolean userSignUp(SignUp data){
        User user=validateUser(data);
        if(user!=null) 
            return false;
        
        userRepository.insert(new User(data.getName(),data.getEmail(),data.getPassword()));
        return true;
    }

    public User validateUser(SignUp data){
        Criteria criteria = Criteria.where("email").is(data.getEmail()).and("password").is(data.getPassword());
        User res=mongoTemplate.findOne(Query.query(criteria), User.class);
        System.out.println(res);
        return res;
    }
}
