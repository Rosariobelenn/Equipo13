package com.app.pyme_go.service.impl;



import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.pyme_go.model.entity.User;
import com.app.pyme_go.repository.UserRepository;
import com.app.pyme_go.service.UserService;



@Service
public class UserServiceImpl implements UserService , UserDetailsService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository ) {
        this.userRepository = userRepository;
    }
    

    @Override
    public UserDetails loadUserByUsername(String gmail) throws UsernameNotFoundException {
        User user = userRepository.findByGmail(gmail)
                                  .orElseThrow(()-> new UsernameNotFoundException("User not found") );
    
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole()); 
        
        return new org.springframework.security.core.userdetails.User(
            user.getGmail(),
            user.getPassword(),
            Collections.singleton(authority)
        );
    }

    
    @Override
    public boolean existsByGmail(String gmail){
        return userRepository.existsByGmail(gmail);
    }

    
    @Override
    public User save(User user){
        return userRepository.save(user);
    }

    
    @Override
    public User findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
    
    @Override
    public User findByGmail(String gmail) {
        return userRepository.findByGmail(gmail).orElse(null);
    }


    @Override
    public List<User> findAll() {
        return  userRepository.findAll(); 
    }


    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

}