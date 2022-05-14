package com.edu.opensky.user.dto;

import com.edu.opensky.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {
    private String email;
    private String password;
    private String name;

    public void setRole(String role) {
        this.role = role;
    }

    private String role;
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
            String email, String password,String role,
            String name, String phone, LocalDate birth)
    {
        this.email = email;
        this.password = password;
        this.role = role;
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
                .role(role)
                .name(name)
                .birth(birth)
                .lastAccessDate(LocalDate.now())
                .build();
    }
}
