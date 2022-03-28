package com.edu.opensky.achievement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import javafx.util.Pair;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    @Query("SELECT new Map(a.achievementId as achievement_id,a.date as date) FROM Achievement a JOIN Mentee m on m.mteId = a.mentee.mteId WHERE m.mteId = :stdId")
    List<HashMap<Long, LocalDate>> findIdByMentee_MteId(String stdId);


}
