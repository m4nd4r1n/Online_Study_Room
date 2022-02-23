package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequestDto {
    private String email;
    private String password;

    public LoginRequestDto(User entity){
        this.email = entity.getEmail();
        this.password = entity.getPassword();
    }

}
