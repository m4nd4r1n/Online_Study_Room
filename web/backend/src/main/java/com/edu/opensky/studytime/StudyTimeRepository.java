package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.levelRankingListInterface;
import com.edu.opensky.studytime.dto.timeRankingListInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface StudyTimeRepository extends JpaRepository<StudyTime, Long> {

    @Transactional(readOnly = true)
    @Query(value = "select m.school as school, u.name as name, m.level as level " +
            "from Mentee m join User u on m.mteId = u.email",nativeQuery = true)
    Page<levelRankingListInterface> findByRankingOfLevel (Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select m.school as school, u.name as name, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mte_id = u.email join Mentee m on m.mteId = s.mte_id " +
            "where date(s.startTime) = date(:date) and not isnull(s.endTime) " +
            "group by s.mte_id " +
            "order by time desc ",nativeQuery = true)
    Page<timeRankingListInterface> findByRankingOfTimeForDay(LocalDate date, Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select m.school as school,u.name as name, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mte_id = u.email join Mentee m on m.mteId = s.mte_id " +
            "where datediff(date(s.startTime), :date) < 7 and not isnull(s.endtime) " +
            "group by s.mte_id " +
            "order by time desc ",nativeQuery = true)
    Page<timeRankingListInterface> findByRankingOfTimeForWeek(LocalDate date,Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select u.name as name,m.school as school, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mte_id = u.email join Mentee m on m.mteId = s.mte_id " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) and not isnull(s.endtime) " +
            "group by s.mte_id " +
            "order by time desc ",nativeQuery = true)
    Page<timeRankingListInterface> findByRankingOfTimeForMonth(LocalDate date,Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select count(distinct(s.mte_id)) " +
            "from StudyTime s " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) "
            ,nativeQuery = true)
    Integer countByStartTime(LocalDate date);

    @Transactional(readOnly = true)
    @Query(value = "select count(distinct(s.mte_id)) " +
            "from StudyTime s " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) and isnull(s.endTime)"
            ,nativeQuery = true)
    Integer countByStartTimeAndEndTimeIsNull(LocalDate date);

    @Transactional(readOnly = true)
    @Query(value = "select ranking " +
            "from( " +
            "select s.mte_id as id, rank() over(order by sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) desc) as ranking " +
            "from StudyTime s join User u on s.mte_id = u.email join Mentee m on m.mteId = s.mte_id " +
            "where date(s.startTime) = date(:date) and not isnull(s.endTime)  " +
            "group by s.mte_id) as t " +
            "where t.id = :id "
            ,nativeQuery = true)
    Integer myRankingOfDay(LocalDate date, String id);

    @Transactional(readOnly = true)
    @Query(value = "select ranking " +
            "from( " +
            "select s.mte_id as id, rank() over(order by sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) desc) as ranking " +
            "from StudyTime s join User u on s.mte_id = u.email join Mentee m on m.mteId = s.mte_id " +
            "where datediff(date(s.startTime), :date) < 7 and not isnull(s.endtime) " +
            "group by s.mte_id) as t " +
            "where t.id = :id "
            ,nativeQuery = true)
    Integer myRankingOfWeek(LocalDate date, String id);

    @Transactional(readOnly = true)
    @Query(value = "select ranking " +
            "from( " +
            "select s.mte_id as id, rank() over(order by sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) desc) as ranking " +
            "from StudyTime s join User u on s.mte_id = u.email join Mentee m on m.mteId = s.mte_id " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) and not isnull(s.endtime) " +
            "group by s.mte_id) as t " +
            "where t.id = :id "
            ,nativeQuery = true)
    Integer myRankingOfMonth(LocalDate date, String id);
}
