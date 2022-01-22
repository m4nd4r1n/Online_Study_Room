package com.edu.opensky.domain.repository;

import com.edu.opensky.domain.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor,String>{

    Optional<Mentor> findByMtrId(String mtrId);
}
