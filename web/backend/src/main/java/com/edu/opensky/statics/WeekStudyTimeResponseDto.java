package com.edu.opensky.statics;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class WeekStudyTimeResponseDto {
    private String name;
    private Integer studyTime;
    private Integer planTime;

    @Builder
    WeekStudyTimeResponseDto(String name, Integer studyTime, Integer planTime){
        this.name = name;
        this.studyTime = studyTime;
        this.planTime = planTime;
    }
}
