package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.LevelRankingDto;
import com.edu.opensky.studytime.dto.TimeRankingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StudyTimeRepository extends JpaRepository<StudyTime, Long> {

    @Query("select m.school, m.user.name, m.level " +
            "from Mentee m ")
    Page<LevelRankingDto> findByRankingOfLevel (Pageable pageable);

    /* 시간 랭킹 수정 중 */
    @Query("select m.school, m.user.name, m.level " +
            "from Mentee m " +
            "order by m.level desc")
    Page<TimeRankingDto> findByRankingOfTimeForDay(Pageable pageable);

    @Query("select m.school, m.user.name, m.level " +
            "from Mentee m " +
            "order by m.level desc")
    Page<TimeRankingDto> findByRankingOfTimeForWeek(Pageable pageable);

    @Query("select m.school, m.user.name, m.level " +
            "from Mentee m " +
            "order by m.level desc")
    Page<TimeRankingDto> findByRankingOfTimeForMonth(Pageable pageable);
}
