package com.edu.opensky.planner;

import com.edu.opensky.planner.dto.PlannerAddDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PlannerController {

    private final PlannerService plannerService;
    
    // 플랜 추가하기
    @PostMapping("/planner")
    public void createPlan(@RequestBody PlannerAddDto plannerAddDto){
        // 토큰 아이디로 수정 필요
        String id ="asdasd@naver.com";

        plannerService.AddPlan(id,plannerAddDto);
    }

    @GetMapping("/planner{queryString}")
    public List<Planner> readPlans(@RequestParam("month") String month,
                                   @RequestParam("day") String day,
                                   @RequestParam("userId") String userId) {
        return plannerService.getPlans(month,day,userId);

    }
    @DeleteMapping("/planner{queryString}")
    public void removePlan(@RequestParam("subject") String subject,
                           @RequestParam("month") String month,
                           @RequestParam("day") String day) {

        plannerService.removePlan(subject,month,day);

        }
    }