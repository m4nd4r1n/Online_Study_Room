package com.edu.opensky.statics;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StaticsController {

    private final StaticsService staticsService;

    @GetMapping("/weekStatic")
    public List<? extends Object> statics(@RequestBody StaticsRequestDto staticsRequestDto){

        return staticsService.findWeekStatics(staticsRequestDto.getPtrId(),staticsRequestDto.getYear(),staticsRequestDto.getMonth(),staticsRequestDto.getDay());

    }

    @GetMapping("/statistics/week{query}")
    public ResponseEntity getWeekStudyTime(@RequestParam @NotNull String userId,
                                           @RequestParam @NotNull String year,
                                           @RequestParam @NotNull String month,
                                           @RequestParam @NotNull String day){

        // 분 단위
        return ResponseEntity.ok(staticsService.getWeekStatics(userId,year,month,day));

    }

    @GetMapping("/statistics/date{query}")
    public ResponseEntity getDateStudyTime(@RequestParam @NotNull String userId,
                                           @RequestParam @NotNull String year,
                                           @RequestParam @NotNull String month,
                                           @RequestParam @NotNull String day){
        // 분 단위
        return ResponseEntity.ok(staticsService.getDateStatics(userId,year,month,day));

    }
}
