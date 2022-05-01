package com.edu.opensky.user.mentee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface MenteeRepository extends JpaRepository<Mentee,String> {

    @Transactional(readOnly = true)
    Optional<Mentee> findByMteId(String mteId);

    @Transactional(readOnly = true)
    List<Mentee> findByMtrId(String mtrId);
}
