package com.edu.opensky.studytime.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyRankingResponseDto {
    Integer current;
    Integer today;
    Integer day;
    Integer week;
    Integer month;
    Integer level;

    @Builder
    public MyRankingResponseDto(Integer current,Integer today,Integer day,Integer week,Integer month,Integer level){
        this.current= current;
        this.today=today;
        this.day= day;
        this.week =week;
        this.month = month;
        this.level = level;
    }

}
