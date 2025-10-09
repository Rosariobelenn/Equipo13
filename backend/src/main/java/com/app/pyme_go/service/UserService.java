package com.app.pyme_go.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import com.app.pyme_go.model.entity.User;

public interface UserService {
    List<User> findAll();
    User findById(Long id);
    User findByGmail(String gmail);  
    User save(User user);
    void deleteById(Long id);
    boolean existsByGmail(String gmail);   
    UserDetails loadUserByUsername(String gmail);
}