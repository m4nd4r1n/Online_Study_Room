package com.edu.opensky.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckResponseDto {
    private String userId;
    private String role;

    public CheckResponseDto() {
    }
}
