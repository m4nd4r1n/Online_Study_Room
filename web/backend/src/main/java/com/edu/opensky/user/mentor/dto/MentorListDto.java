package com.edu.opensky.user.mentor.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MentorListDto {
    private String mtrId;
    private String name;
    private String phone;

    @Builder
    public MentorListDto(String mtrId, String name, String phone){
        this.mtrId = mtrId;
        this.name = name;
        this.phone = phone;
    }
}
