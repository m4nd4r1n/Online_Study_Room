package com.edu.opensky.user.mentor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor,String>{
    @Transactional(readOnly = true)
    Optional<Mentor> findByMtrId(String email);
}
