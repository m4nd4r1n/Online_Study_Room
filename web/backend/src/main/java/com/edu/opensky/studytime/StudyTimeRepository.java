package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.levelRankingListInterface;
import com.edu.opensky.studytime.dto.timeRankingListInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface StudyTimeRepository extends JpaRepository<StudyTime, Long> {


    @Query("select m.school as school, u.name as name, m.level as level " +
            "from Mentee m join User u on m.mteId = u.email")
    Page<levelRankingListInterface> findByRankingOfLevel (Pageable pageable);


    @Query("select s.mentee.school as school,u.name as name, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mentee.mteId = u.email " +
            "where date(s.startTime) = date(:date) " +
            "group by s.mentee.mteId " +
            "order by time desc ")
    Page<timeRankingListInterface> findByRankingOfTimeForDay(LocalDate date, Pageable pageable);

    @Query("select s.mentee.school as school,u.name as name, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mentee.mteId = u.email " +
            "where datediff(date(s.startTime), :date) < 7 " +
            "group by s.mentee.mteId " +
            "order by time desc ")
    Page<timeRankingListInterface> findByRankingOfTimeForWeek(LocalDate date,Pageable pageable);

    @Query("select u.name as name, s.mentee.school as school, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mentee.mteId = u.email " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) " +
            "group by s.mentee.mteId " +
            "order by time desc ")
    Page<timeRankingListInterface> findByRankingOfTimeForMonth(LocalDate date,Pageable pageable);
}
