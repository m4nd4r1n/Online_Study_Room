package com.edu.opensky.attendance;

import com.edu.opensky.user.mentee.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    Optional<Attendance> findByMenteeAndDate(Mentee mentee, LocalDate date);
    List<Attendance> findByMentee(Mentee mentee);
}
