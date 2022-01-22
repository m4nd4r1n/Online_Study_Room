package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.User;
import lombok.Getter;

@Getter
public class UserResponseDto {
    private String email;
    private String password;

    public UserResponseDto(User entity){
        this.email = entity.getEmail();
        this.password = entity.getPassword();
    }
}
