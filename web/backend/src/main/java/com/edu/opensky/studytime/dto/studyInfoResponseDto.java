package com.edu.opensky.studytime.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class studyInfoResponseDto {
    String name;
    Integer level;
    Integer exp;


    @Builder
    public studyInfoResponseDto(String name, Integer level, Integer exp){
        this.name =name;
        this.level = level;
        this.exp = exp;
    }


}
