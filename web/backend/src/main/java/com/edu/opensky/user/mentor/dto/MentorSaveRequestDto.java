package com.edu.opensky.user.mentor.dto;

import com.edu.opensky.user.mentor.Mentor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MentorSaveRequestDto {
    private String email;
    private String name;

    public Mentor toEntity(){
        return Mentor.builder()
                .mtrId(email)
                .name(name)
                .build();
    }

    @Builder
    public MentorSaveRequestDto(String email, String name){
        this.email = email;
        this.name = name;
    }
    public MentorSaveRequestDto(String email) {
        this.email = email;
    }
}
