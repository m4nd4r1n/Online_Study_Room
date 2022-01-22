package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.Mentor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MentorSaveRequestDto {
    private String mtrId;
    private String mteId;

    public Mentor toEntity(){
        return Mentor.builder()
                .mtrId(mtrId)
                .mteId(mteId)
                .build();
    }

    @Builder
    public MentorSaveRequestDto(String mtrId, String mteId){
        this.mtrId = mtrId;
        this.mteId = mteId;
    }
    public MentorSaveRequestDto(String mtrId) {
        this.mtrId = mtrId;
    }
}
