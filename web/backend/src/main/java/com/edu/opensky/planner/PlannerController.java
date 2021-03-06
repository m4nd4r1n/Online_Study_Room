package com.edu.opensky.planner;

import com.edu.opensky.planner.dto.PlannerAddDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity createPlan(@RequestBody PlannerAddDto plannerAddDto,@CookieValue(value="Authorization")String token){

        User user= userService.getUserByToken(token);

        if (user.getRole().equals("멘티")) {
            plannerService.AddPlan(user.getEmail(), plannerAddDto);
            return new ResponseEntity<>(HttpStatus.OK);
        } else if (user.getRole().equals("멘토")) {
            plannerService.AddPlan(plannerAddDto.getUserId(), plannerAddDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);


    }

    @GetMapping("/planner{queryString}")
    public List<Planner> readPlans(@RequestParam("year")@NonNull String year,
                                   @RequestParam("month")@NonNull String month,
                                   @RequestParam("day")@NonNull String day,
                                   @RequestParam("userId")@NonNull String userId,
                                   @CookieValue(value="Authorization")String token)
    {

        User user= userService.getUserByToken(token);
        if(user.getRole().equals("멘티")) {
            return plannerService.getPlans(year, month, day, user.getEmail());
        } else if (user.getRole().equals("멘토")) {
            return plannerService.getPlans(year, month, day, userId);
        }
        return null;

    }
    @DeleteMapping("/planner{queryString}")
    public ResponseEntity removePlan(@RequestParam("subject") String subject,
                                     @RequestParam("year")@NonNull String year,
                                     @RequestParam("month") String month,
                                     @RequestParam("day") String day,
                                     @RequestParam("userId")@NonNull String userId,
                                     @CookieValue(value="Authorization") String token) {

        User user = userService.getUserByToken(token);
        if(user.getRole().equals("멘티")) {
            if(plannerService.removePlan(subject,year,month,day,user.getEmail())){
                return ResponseEntity.ok().build();
            }
            else
                return ResponseEntity.badRequest().build();
        } else if (user.getRole().equals("멘토")) {
            if(plannerService.removePlan(subject,year,month,day,userId)){
                return ResponseEntity.ok().build();
            }
            else
                return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.badRequest().build();
    }
}