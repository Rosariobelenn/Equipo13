package com.app.pyme_go.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;
import com.app.pyme_go.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface UserRepository extends JpaRepository<User, Long>{

   
    Optional<User> findByGmail(String gmail); 
    boolean existsByGmail(String gmail);


}