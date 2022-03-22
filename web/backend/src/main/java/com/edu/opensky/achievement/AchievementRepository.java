package com.edu.opensky.achievement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    @Query("SELECT a.achievementId FROM Achievement a JOIN Mentee m on m.mteId = a.mentee.mteId")
    List<Long> findIdByMentee_MteId(String stdId);


}
