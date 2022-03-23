package com.edu.opensky.planner;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PlannerRepository extends JpaRepository<Planner, Long> {

    List<Planner> findPlannersByDateAndMentee_MteId(LocalDate date,String userId);

    Optional<Planner> findBySubjectAndDate(String subject, LocalDate date);
}
