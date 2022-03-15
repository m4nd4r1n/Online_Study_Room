package com.edu.opensky.user.parent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParentRepository extends JpaRepository<Parent,String> {
    Optional<Parent> findByPrtId(String prtId);
}
