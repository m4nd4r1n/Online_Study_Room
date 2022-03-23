package com.edu.opensky.studytime;

import com.edu.opensky.studytime.dto.LevelRankingDto;
import com.edu.opensky.studytime.dto.TimeRankingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StudyTimeController {
    private final StudyTimeService studyTimeService;

    @GetMapping("/ranking")
    public void getRanking(
            @RequestParam Integer page,
            @RequestParam String type,
            @RequestParam(required = false) String time){

        if (type.equals("time")) {
            PageRequest pageRequest = PageRequest.of(page,20, Sort.by("m.level").descending());
            Page<TimeRankingDto> timeRankingDtoPage = studyTimeService.getRankingOfTime(time,pageRequest);
            }
        else {
            PageRequest pageRequest = PageRequest.of(page,20);
            Page<LevelRankingDto> levelRankingDtoPage = studyTimeService.getRankingOfLevel(pageRequest);
        }


    }
}
