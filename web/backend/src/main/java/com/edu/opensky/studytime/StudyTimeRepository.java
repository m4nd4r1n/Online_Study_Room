package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.levelRankingListInterface;
import com.edu.opensky.studytime.dto.timeRankingListInterface;
import com.edu.opensky.user.mentee.Mentee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface StudyTimeRepository extends JpaRepository<StudyTime, Long> {

    List<StudyTime> findByMenteeAndEndTimeIsNullOrderByStartTimeDesc(Mentee mentee);

    @Transactional(readOnly = true)
    @Query(value = "select m.school as school, u.name as name, m.level as level " +
            "from Mentee m join User u on m.mteId = u.email",nativeQuery = true)
    Page<levelRankingListInterface> findByRankingOfLevel (Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select m.school as school, u.name as name, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mteId = u.email join Mentee m on m.mteId = s.mteId " +
            "where date(s.startTime) = date(:date) and not isnull(s.endTime) " +
            "group by s.mteId, m.school, u.name " +
            "order by time desc ",nativeQuery = true)
    Page<timeRankingListInterface> findByRankingOfTimeForDay(LocalDate date, Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select m.school as school,u.name as name, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mteId = u.email join Mentee m on m.mteId = s.mteId " +
            "where datediff(:date, date(s.startTime)) < 7 and datediff(:date, date(s.startTime)) >= 0 and not isnull(s.endtime) " +
            "group by s.mteId, m.school, u.name " +
            "order by time desc ",nativeQuery = true)
    Page<timeRankingListInterface> findByRankingOfTimeForWeek(LocalDate date,Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select u.name as name,m.school as school, sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from StudyTime s join User u on s.mteId = u.email join Mentee m on m.mteId = s.mteId " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) and not isnull(s.endtime) " +
            "group by s.mteId, m.school, u.name " +
            "order by time desc ",nativeQuery = true)
    Page<timeRankingListInterface> findByRankingOfTimeForMonth(LocalDate date,Pageable pageable);

    @Transactional(readOnly = true)
    @Query(value = "select count(distinct(s.mteId)) " +
            "from StudyTime s " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) "
            ,nativeQuery = true)
    Integer countByStartTime(LocalDate date);

    @Transactional(readOnly = true)
    @Query(value = "select count(distinct(s.mteId)) " +
            "from StudyTime s " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) and isnull(s.endTime)"
            ,nativeQuery = true)
    Integer countByStartTimeAndEndTimeIsNull(LocalDate date);

    @Transactional(readOnly = true)
    @Query(value = "select ranking " +
            "from( " +
            "select s.mteId as id, rank() over(order by sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) desc) as ranking " +
            "from StudyTime s join User u on s.mteId = u.email join Mentee m on m.mteId = s.mteId " +
            "where date(s.startTime) = date(:date) and not isnull(s.endTime)  " +
            "group by s.mteId) as t " +
            "where t.id = :id "
            ,nativeQuery = true)
    Integer myRankingOfDay(LocalDate date, String id);

    @Transactional(readOnly = true)
    @Query(value = "select ranking " +
            "from( " +
            "select s.mteId as id, rank() over(order by sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) desc) as ranking " +
            "from StudyTime s join User u on s.mteId = u.email join Mentee m on m.mteId = s.mteId " +
            "where datediff(date(s.startTime), :date) < 7 and not isnull(s.endtime) " +
            "group by s.mteId) as t " +
            "where t.id = :id "
            ,nativeQuery = true)
    Integer myRankingOfWeek(LocalDate date, String id);

    @Transactional(readOnly = true)
    @Query(value = "select ranking " +
            "from( " +
            "select s.mteId as id, rank() over(order by sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) desc) as ranking " +
            "from StudyTime s join User u on s.mteId = u.email join Mentee m on m.mteId = s.mteId " +
            "where month(s.startTime)= month(:date) and year(s.startTime) = year(:date) and not isnull(s.endtime) " +
            "group by s.mteId) as t " +
            "where t.id = :id "
            ,nativeQuery = true)
    Integer myRankingOfMonth(LocalDate date, String id);

    @Transactional(readOnly = true)
    @Query(value = "select ranking " +
            "from( " +
            "select m.mteId as id, rank() over(order by m.level desc) as ranking " +
            "from Mentee m " +
            "order by m.level desc ) as t " +
            "where t.id = :id "
            ,nativeQuery = true)
    Integer MyRankingOfLevel (String id);

    @Transactional(readOnly = true)
    @Query(value = "select * " +
            "from StudyTime s join Mentee m on s.mteId = m.mteId " +
            "where datediff(date(s.startTime),:date) = 0 and s.mteId = :userId "
            ,nativeQuery = true)
    List<StudyTime> findByDate(LocalDate date, String userId);

}
