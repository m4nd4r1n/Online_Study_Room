package com.edu.opensky.studytime.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class LevelRankingDto {

    private String school;
    private String name;
    private Integer level;

    @Builder
    public LevelRankingDto(String school, String name, Integer level){
        this.school = school;
        this.name = name;
        this.level =level;
    }

}
