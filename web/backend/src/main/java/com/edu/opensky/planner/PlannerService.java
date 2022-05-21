package com.edu.opensky.planner;

import com.edu.opensky.planner.dto.PlannerAddDto;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PlannerService {
    private final PlannerRepository plannerRepository;
    private final MenteeRepository menteeRepository;

    public void AddPlan(String id, PlannerAddDto plannerAddDto){

        String[] dateSplit = plannerAddDto.getDate().split("T");
        LocalDate date = LocalDate.parse(dateSplit[0]);
        LocalTime startTime = LocalTime.of(
                Integer.parseInt(plannerAddDto.getStartTime().substring(0,2)),
                Integer.parseInt(plannerAddDto.getStartTime().substring(3,5)),
                Integer.parseInt(plannerAddDto.getStartTime().substring(6,8)));
        LocalTime endTime = LocalTime.of(
                Integer.parseInt(plannerAddDto.getEndTime().substring(0,2)),
                Integer.parseInt(plannerAddDto.getEndTime().substring(3,5)),
                Integer.parseInt(plannerAddDto.getEndTime().substring(6,8)));
        Mentee mentee = menteeRepository.findByMteId(id).orElseThrow(()->
            new IllegalArgumentException("일치하는 멘티가 없습니다.")
        );
        plannerRepository.save(Planner.builder()
                .subject(plannerAddDto.getSubject())
                .mentee(mentee)
                .date(date)
                .startTime(startTime)
                .endTime(endTime)
                .build());

    }


    public List<Planner> getPlans(String year, String month, String day, String userId){
        LocalDate date = LocalDate.of(Integer.parseInt(year),Integer.parseInt(month),Integer.parseInt(day));

        return plannerRepository.findPlannersByDateAndMentee_MteId(date, userId);
    }

    public boolean removePlan(String subject, String year, String month, String day, String userId){

        LocalDate date = LocalDate.of(Integer.parseInt(year),Integer.parseInt(month),Integer.parseInt(day));
        Optional<Planner> planner = plannerRepository.findBySubjectAndDateAndMentee_MteId(subject,date,userId);
        if (planner.isPresent()){
            plannerRepository.delete(planner.get());
            return true;
        }
        else{
            return false;
        }


    }
}
