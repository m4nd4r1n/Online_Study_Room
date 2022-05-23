package com.edu.opensky.statics;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DateStudyTimeResponseDto {
    private Integer studyTime;
    private Integer planTime;

    @Builder
    DateStudyTimeResponseDto(Integer studyTime, Integer planTime){
        this.planTime = planTime;
        this.studyTime = studyTime;
    }
}
