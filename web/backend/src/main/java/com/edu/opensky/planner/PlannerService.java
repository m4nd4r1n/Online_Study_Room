package com.edu.opensky.planner;

import com.edu.opensky.planner.dto.PlannerAddDto;
import com.edu.opensky.user.mentee.Mentee;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class PlannerService {
    private final PlannerRepository plannerRepository;

    public void AddPlan(String id, PlannerAddDto plannerAddDto){

        String[] dateSplit = plannerAddDto.getDate().split("T");
        LocalDate date = LocalDate.parse(dateSplit[0]);

        LocalTime startTime = LocalTime.of(
                Integer.parseInt(plannerAddDto.getStartTime().substring(0,1)),
                Integer.parseInt(plannerAddDto.getStartTime().substring(2,3)));
        LocalTime endTime = LocalTime.of(
                Integer.parseInt(plannerAddDto.getEndTime().substring(0,1)),
                Integer.parseInt(plannerAddDto.getEndTime().substring(2,3)));

        plannerRepository.save(Planner.builder()
                .subject(plannerAddDto.getSubject())
                .mentee(Mentee.builder().mteId(id).build())
                .date(date)
                .startTime(startTime)
                .endTime(endTime)
                .build());

    }


    public List<Planner> getPlans(String month, String day, String userId){
        LocalDate date = LocalDate.of(2022,Integer.parseInt(month),Integer.parseInt(day));

        return plannerRepository.findPlannersByDateAndMentee_MteId(
                date, userId);
    }

    public void removePlan(String subject, String month, String day){

        LocalDate date = LocalDate.of(2022,Integer.parseInt(month),Integer.parseInt(day));
        plannerRepository.findBySubjectAndDate(subject,date).ifPresent(plannerRepository::delete);

    }
}
