package com.edu.opensky.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FindRequestDto {
    private String impUID;
    private String email;

    @Builder
    public FindRequestDto(
            String impUID, String email)
    {
        this.impUID = impUID;
        this.email = email;
    }
}
