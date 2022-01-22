package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {
    private String email;
    private String password;
    private String name;
    private String regnum;
    private String phone;
    private char sex;
    private String location;
    private String role;
    @Builder
    public UserSaveRequestDto(
            String email, String password,String name, String regnum, String phone,char sex, String location, String role)
    {
        this.email = email;
        this.password = password;
        this.name = name;
        this.regnum = regnum;
        this.phone = phone;
        this.sex = sex;
        this.location = location;
        this.role = role;
    }

    public User toEntity(){
        return User.builder()
                .email(email)
                .password(password)
                .name(name)
                .regnum(regnum)
                .phone(phone)
                .sex(sex)
                .location(location)
                .build();
    }
}
