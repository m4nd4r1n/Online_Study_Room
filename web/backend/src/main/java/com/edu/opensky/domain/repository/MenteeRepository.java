package com.edu.opensky.domain.repository;

import com.edu.opensky.domain.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenteeRepository extends JpaRepository<Mentee,String> {
    Optional<Mentee> findByMteId(String mteId);
}
