package com.edu.opensky.studytime.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class TimeRankingDto {


    private String school;
    private String name;
    private LocalTime time;

    @Builder
    public TimeRankingDto(String school, String name, LocalTime time){
        this.school = school;
        this.name = name;
        this.time =time;
    }

}