package com.edu.opensky.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    @Transactional(readOnly = true)
    Optional<User> findByEmail(String email);

    @Transactional(readOnly = true)
    Optional<User> findByEmailAndPassword(String email, String password);

    @Transactional(readOnly = true)
    Optional<User> findByPhone(String phone);

    @Transactional(readOnly = true)
    Optional<User> findByPassword(String password);

    Optional<User> findByPhoneAndName(String phone, String name);

    @Transactional(readOnly = true)
    Optional<User> findByEmailAndPhone(String email, String phone);
}
