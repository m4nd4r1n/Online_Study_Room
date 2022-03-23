package com.edu.opensky.achievement;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/achievement")
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping("")
    public JSONArray getAchievementList(){
        /* 수정 예정 */
        // 토큰에 있는 학생아이디 받아오도록
        String Token_id = "asdasd@naver.com";
        return achievementService.getAchievementList(Token_id);


    }
    // achievement_list.json 읽고 달성과제 리스트 데이터 베이스 저장
    @PostMapping("")
    public void setAchievementList(){
        achievementService.setAchievementList();
    }
}
