package com.edu.opensky.planner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PlannerRepository extends JpaRepository<Planner, Long> {
    @Transactional(readOnly = true)
    List<Planner> findPlannersByDateAndMentee_MteId(LocalDate date,String userId);

    Optional<Planner> findBySubjectAndDateAndMentee_MteId(String subject, LocalDate date, String userId);

    @Transactional(readOnly = true)
    List<Planner> findByDateEqualsAndAndMentee_MteId(LocalDate date, String mteId);
}
