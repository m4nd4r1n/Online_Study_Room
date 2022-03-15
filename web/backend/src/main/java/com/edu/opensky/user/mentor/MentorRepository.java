package com.edu.opensky.user.mentor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor,String>{

    Optional<Mentor> findByMtrId(String email);
}
