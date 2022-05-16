package com.edu.opensky.planner;

import com.edu.opensky.planner.dto.PlannerAddDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PlannerController {

    private final PlannerService plannerService;
    private final UserService userService;

    // 플랜 추가하기
    @PostMapping("/planner")
    public String createPlan(@RequestBody PlannerAddDto plannerAddDto,@CookieValue(value="Authorization")String token){
        // 토큰 아이디로 수정 필요
        User user= userService.getUserByToken(token);
        String id=user.getEmail();

        plannerService.AddPlan(id,plannerAddDto);

        return id;


    }

    @GetMapping("/planner{queryString}")
    public List<Planner> readPlans(@RequestParam("year")@NonNull String year,
                                   @RequestParam("month")@NonNull String month,
                                   @RequestParam("day")@NonNull String day,
                                   @RequestParam("userId") String userId) {
//        if (userId.isEmpty()) {
//            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//            User user= userService.getUserByToken(principal);
//            return plannerService.getPlans(month, day, user.getEmail());
//        }

        return plannerService.getPlans(year,month,day,userId);

    }
    @DeleteMapping("/planner{queryString}")
    public void removePlan(@RequestParam("subject") String subject,
                           @RequestParam("year")@NonNull String year,
                           @RequestParam("month") String month,
                           @RequestParam("day") String day) {

        plannerService.removePlan(subject,year,month,day);

    }
}