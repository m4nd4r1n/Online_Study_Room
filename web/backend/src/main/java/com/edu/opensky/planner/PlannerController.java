package com.edu.opensky.planner;

import com.edu.opensky.planner.dto.PlannerAddDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PlannerController {

    private final PlannerService plannerService;
    private final UserService userService;
    // 플랜 추가하기
    /*
    @PostMapping("/check")
    public String check(){
        Object principal=SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user= userService.getUserByToken(principal);
        String id=user.getEmail();

        return id;
    }
    */

    @PostMapping("/planner")
    public String createPlan(@RequestBody PlannerAddDto plannerAddDto,ServletRequest request){
        // 토큰 아이디로 수정 필요
        System.out.println("plannerAddDto.getStartTime() = " + plannerAddDto.getStartTime());
        userService.check(request);
        Object principal=SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user= userService.getUserByToken(principal);
        String id=user.getEmail();

        //String id ="asdasd@naver.com";

        plannerService.AddPlan(id,plannerAddDto);

        return id;


    }

    @GetMapping("/planner{queryString}")
    public List<Planner> readPlans(@RequestParam("year")@NonNull String year,
                                   @RequestParam("month")@NonNull String month,
                                   @RequestParam("day")@NonNull String day,
                                   ServletRequest request)
//            ,
//                                   @RequestParam("userId") String userId) {
    {
     //   if (userId.isEmpty()) {

        userService.check(request);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user= userService.getUserByToken(principal);
        return plannerService.getPlans(year, month, day, user.getEmail());
       // }

        //return plannerService.getPlans(year,month,day,userId);

    }
    @DeleteMapping("/planner{queryString}")
    public void removePlan(@RequestParam("subject") String subject,
                           @RequestParam("year")@NonNull String year,
                           @RequestParam("month") String month,
                           @RequestParam("day") String day) {

        plannerService.removePlan(subject,year,month,day);

    }
}