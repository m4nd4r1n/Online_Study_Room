package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.Mentee;
import com.edu.opensky.domain.Mentor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenteeSaveRequestDto {
    private String mteId;
    private String school;

    @Builder
    public MenteeSaveRequestDto(String mteId, String school){
        this.mteId = mteId;
        this.school = school;
    }

    public MenteeSaveRequestDto(String email) {
        this.mteId = email;
    }

    public Mentee toEntity(){
        return Mentee.builder()
                .mteId(mteId)
                .school(school)
                .build();
    }

}
