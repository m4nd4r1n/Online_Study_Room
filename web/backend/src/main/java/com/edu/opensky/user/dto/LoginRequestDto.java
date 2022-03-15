package com.edu.opensky.user.dto;

import com.edu.opensky.user.User;
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
