package com.edu.opensky.achievement;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class AchievementService {
    private final AchievementRepository achievementRepository;

    // 학생 아이디로 달성한 과제 번호 리스트 반환
    public List<Long> getAchievementList(String stdId){
        return achievementRepository.findIdByMentee_MteId(stdId);

    }

}
