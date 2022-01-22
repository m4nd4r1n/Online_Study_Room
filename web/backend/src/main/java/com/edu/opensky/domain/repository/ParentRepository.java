package com.edu.opensky.domain.repository;

import com.edu.opensky.domain.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParentRepository extends JpaRepository<Parent,String> {
    Optional<Parent> findByPrtId(String prtId);
}
