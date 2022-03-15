package com.edu.opensky.user.mentee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenteeRepository extends JpaRepository<Mentee,String> {
    Optional<Mentee> findByMteId(String mteId);
}
