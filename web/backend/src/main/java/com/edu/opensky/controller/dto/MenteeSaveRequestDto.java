package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.Mentee;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenteeSaveRequestDto {
    private String email;
    private String school;

    @Builder
    public MenteeSaveRequestDto(String email, String school){
        this.email = email;
        this.school = school;
    }

    public MenteeSaveRequestDto(String email) {
        this.email = email;
    }

    public Mentee toEntity(){
        return Mentee.builder()
                .mteId(email)
                .school(school)
                .build();
    }

}
