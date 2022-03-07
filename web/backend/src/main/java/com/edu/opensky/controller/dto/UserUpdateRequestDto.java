package com.edu.opensky.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class
UserUpdateRequestDto {
    private String newPassword;
    private String oldPassword;

    @Builder
    public UserUpdateRequestDto(String oldPassword, String newPassword){
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
