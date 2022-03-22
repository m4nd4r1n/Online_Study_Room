package com.edu.opensky.planner;

import com.edu.opensky.user.mentee.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PlannerRepository extends JpaRepository<Planner, Long> {

    List<Planner> findPlannersByDateAndMentee_MteId(LocalDate date,String userId);

    Optional<Planner> findBySubjectAndDate(String subject, LocalDate date);
}
