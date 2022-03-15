package com.edu.opensky.attendance;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {
    Optional<Attendance> findByStdIdAndDate(String stdId, LocalDate date);
    List<Attendance> findByStdId(String stdId);
}
