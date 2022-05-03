package com.edu.opensky.user.mentee.dto;

import com.edu.opensky.user.mentee.Mentee;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenteeSaveRequestDto {
    private String email;
    private String name;
    private String school;

    @Builder
    public MenteeSaveRequestDto(String email,String name, String school){
        this.email = email;
        this.name = name;
        this.school = school;
    }

    public MenteeSaveRequestDto(String email) {
        this.email = email;
    }

    public Mentee toEntity(){
        return Mentee.builder()
                .mteId(email)
                .school(school)
                .name(name)
                .build();
    }

}
