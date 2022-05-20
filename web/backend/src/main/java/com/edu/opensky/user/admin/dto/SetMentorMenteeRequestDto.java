package com.edu.opensky.user.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@NoArgsConstructor
public class SetMentorMenteeRequestDto {
    @NotEmpty
    private String mtrId;
    @NotEmpty
    private String mteId;

    @Builder
    public SetMentorMenteeRequestDto(String mtrId, String mteId)
    {
        this.mteId= mteId;
        this.mtrId = mtrId;
    }
}

