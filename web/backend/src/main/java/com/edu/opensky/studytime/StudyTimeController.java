package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.MyRankingResponseDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StudyTimeController {
    private final StudyTimeService studyTimeService;
    private final UserService userService;

    @GetMapping("/ranking{queryUrl}")
    public List<? extends Object> getRanking(
            @RequestParam Integer page,
            @RequestParam String type,
            @RequestParam(required = false) String time){

        try {
            if(page < 1){
                Exception e = new Exception();
            }
            if (type.equals("time")) {
                PageRequest pageRequest = PageRequest.of(page-1,25);
                return studyTimeService.getRankingOfTime(time,pageRequest);
            }
            else {
                PageRequest pageRequest = PageRequest.of(page-1,25, Sort.by("level").descending());
                return studyTimeService.getRankingOfLevel(pageRequest);
            }
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }


    }

    @GetMapping("/rank")
    public MyRankingResponseDto getNumOfStudyAndRankInfo(
            @CookieValue(value="Authorization")String token){

        User user = userService.getUserByToken(token);
        String id = user.getEmail();
        Integer current = studyTimeService.getNumOfNowStudying();
        Integer today = studyTimeService.getNumOfTodayStudying();
        Integer day = studyTimeService.getMyDailyRanking(id);
        Integer week = studyTimeService.getMyWeeklyRanking(id);
        Integer month =studyTimeService.getMyMonthlyRanking(id);
        Integer level = studyTimeService.getMyLevelRanking(id);

        // 학습 시간이 없으면 랭킹 null로 반환
        return MyRankingResponseDto.builder().current(current).day(day).month(month).level(level).week(week).today(today).build();
    }

}
