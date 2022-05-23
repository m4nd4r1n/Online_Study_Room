package com.edu.opensky.statics;

import com.edu.opensky.studytime.StudyTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface StaticsRepository extends JpaRepository<StudyTime,Long> {
    @Override
    List<StudyTime> findAll();


    @Transactional(readOnly = true)
    @Query(value = "select ifnull(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime)),0) " +
            "from StudyTime s join Mentee m on m.mteId = s.mteId "+
            "where datediff(:date, date(s.startTime)) = 0 and not isnull(s.endtime) and m.mteId =:userId ",nativeQuery = true)
    Integer findSecondsByStudyTime(String userId, LocalDate date);

    @Transactional(readOnly = true)
    @Query(value = "select ifnull(sum(time_to_sec(p.endTime)-time_to_sec(p.startTime)),0) " +
            "from Planner p join Mentee m on m.mteId = p.mte_id "+
            "where datediff(:date, date(p.date)) = 0 and m.mteId =:userId ",nativeQuery = true)
    Integer findSecondsByPlanTime(String userId, LocalDate date);
    //
    @Transactional(readOnly = true)
    @Query(value = "select sec_to_time(sum(time_to_sec(s.endTime)-time_to_sec(s.startTime))) as time " +
            "from Studytime s join User u on s.mteId = u.email join Mentee m on m.mteId = s.mteId join Parent p on p.prtId = m.prtid "+
            "where datediff(date(s.startTime), :date) < 7 and not isnull(s.endtime) and p.prtId=:PtrId ",nativeQuery = true)
    public List<? extends Object> findByWeekStudyTime(String PtrId, LocalDateTime date);

    @Transactional(readOnly = true)
    @Query(value = "select ifnull(sum(time_to_sec(p.endTime)-time_to_sec(p.startTime)),0) " +
            "from Planner p join Mentee m on m.mteId = p.mte_id "+
            "where datediff(:date, date(p.date)) = 0 and m.mteId =:userId ",nativeQuery = true)
    Integer findSumPlanTime(String userId, LocalDate date);
}
