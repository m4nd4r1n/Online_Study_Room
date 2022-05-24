package com.edu.opensky.studytime;

import com.edu.opensky.image.ImageService;
import com.edu.opensky.studytime.dto.MyRankingResponseDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StudyTimeController {
    private final StudyTimeService studyTimeService;
    private final UserService userService;
    private final ImageService imageService;

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

    // 미인식 시간 업로드
    @PostMapping("/study/upload")
    public ResponseEntity uploadFrame(
            @RequestParam("formData") List<MultipartFile> files,
            @CookieValue(value="Authorization") String token) throws IOException {

        User user = userService.getUserByToken(token);
        imageService.saveImage(user,files);

        return ResponseEntity.ok().build();
    }
}
