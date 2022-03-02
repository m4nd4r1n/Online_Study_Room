package com.edu.opensky.domain.repository;

import com.edu.opensky.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByPhone(String phone);
    Optional<User> findByPassword(String password);
}
