package com.edu.opensky.achievement;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/achievement")
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping("")
    public List<Long> getAchievementList(){
        /* 수정 예정 */
        // 토큰에 있는 학생아이디 받아오도록
        String Token_id = "asdasd@naver.com";
        return achievementService.getAchievementList(Token_id);


    }
}
