package com.edu.opensky.studytime;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StudyTimeController {
    private final StudyTimeService studyTimeService;

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
}
