package com.edu.opensky.user.mentor.dto;

import com.edu.opensky.user.mentor.Mentor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MentorSaveRequestDto {
    private String email;
    private String mteId;

    public Mentor toEntity(){
        return Mentor.builder()
                .mtrId(email)
                .mteId(mteId)
                .build();
    }

    @Builder
    public MentorSaveRequestDto(String email, String mteId){
        this.email = email;
        this.mteId = mteId;
    }
    public MentorSaveRequestDto(String email) {
        this.email = email;
    }
}
