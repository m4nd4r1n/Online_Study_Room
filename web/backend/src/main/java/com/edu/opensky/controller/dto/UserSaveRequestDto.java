package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {
    private String impUID;
    private String email;
    private String password;
    @Builder
    public UserSaveRequestDto(
            String email, String password, String impUID)
    {
        this.impUID = impUID;
        this.email = email;
        this.password = password;
    }


    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .build();
    }
}
