package com.edu.opensky.achievement;

import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/achievement")
public class AchievementController {

    private final AchievementService achievementService;
    private final UserService userService;

    @GetMapping("")
    public JSONArray getAchievementList(@CookieValue(value="Authorization") String token){
        // 토큰에 있는 학생아이디 받아오도록
//        Object principal= SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User user= userService.getUserByToken(principal);
//        String Token_id=user.getEmail();
//        //String Token_id = "asdasd@naver.com";
        // 테스트용
        User user = userService.getUserByToken(token);

        return achievementService.getAchievementList(user.getEmail());


    }
    // achievement_list.json 읽고 달성과제 리스트 데이터 베이스 저장
    @PostMapping("")
    public void setAchievementList(){
        achievementService.setAchievementList();
    }
}
