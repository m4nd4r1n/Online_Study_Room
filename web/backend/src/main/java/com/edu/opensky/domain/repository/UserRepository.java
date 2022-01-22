package com.edu.opensky.domain.repository;

import com.edu.opensky.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    
    Optional<User> findByRegnum(String regnum);
    boolean existsByEmailAndPassword(String email, String password);
}
