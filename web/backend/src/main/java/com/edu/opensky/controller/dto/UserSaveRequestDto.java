package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {
    private String impUID;
    private String email;
    private String password;
    private String name;
    private String phone;
    private LocalDate birth;

    @Builder
    public UserSaveRequestDto(
            String email, String password,
            String name, String phone, LocalDate birth)
    {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone= phone;
        this.birth = birth;
    }

    @Builder
    public UserSaveRequestDto(
            String email, String password)
    {
        this.email = email;
        this.password = password;
    }


    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .phone(phone)
                .name(name)
                .birth(birth)
                .lastAccessDate(LocalDate.now())
                .build();
    }
}
