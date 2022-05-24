package com.edu.opensky.statics;

import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StaticsController {

    private final StaticsService staticsService;
    private final UserService userService;

    @GetMapping("/weekStatic")
    public List<? extends Object> statics(@RequestBody StaticsRequestDto staticsRequestDto){

        return staticsService.findWeekStatics(staticsRequestDto.getPtrId(),staticsRequestDto.getYear(),staticsRequestDto.getMonth(),staticsRequestDto.getDay());

    }

    @GetMapping("/statistics/week{query}")
    public ResponseEntity getWeekStudyTime(@RequestParam @Nullable String userId,
                                           @RequestParam @NotNull String year,
                                           @RequestParam @NotNull String month,
                                           @RequestParam @NotNull String day,
                                           @CookieValue(value="Authorization") String token){
        User user = userService.getUserByToken(token);
        if(user.getRole().equals("멘토") || user.getRole().equals("학부모")) {

            // 분 단위
            return ResponseEntity.ok(staticsService.getWeekStatics(userId, year, month, day));
        }
        else if(user.getRole().equals("멘티")){

            // 분 단위
            return ResponseEntity.ok(staticsService.getWeekStatics(user.getEmail(), year, month, day));

        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/statistics/date{query}")
    public ResponseEntity getDateStudyTime(@RequestParam @Nullable String userId,
                                           @RequestParam @NotNull String year,
                                           @RequestParam @NotNull String month,
                                           @RequestParam @NotNull String day,
                                           @CookieValue(value="Authorization") String token){
        User user = userService.getUserByToken(token);
        if(user.getRole().equals("멘토") || user.getRole().equals("학부모")) {
            // 분 단위
            return ResponseEntity.ok(staticsService.getDateStatics(userId, year, month, day));
        }
        else if (user.getRole().equals("멘티")){
            return ResponseEntity.ok(staticsService.getDateStatics(user.getEmail(), year, month, day));
        }
        return ResponseEntity.badRequest().build();
    }
}
