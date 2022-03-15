package com.edu.opensky.user.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RegisterRequestDto {

    private String type;
    private String impUID;
    private String email;
    private String password;
    private String school;
    private String stdName;
    private String phoneFirst;
    private String phoneMiddle;
    private String phoneLast;

    @Builder
    public RegisterRequestDto(
            String email, String password, String type, String impUID, String school,
            String stdName, String phoneFirst, String phoneMiddle, String phoneLast)
    {
        this.type = type;
        this.impUID = impUID;
        this.email = email;
        this.password = password;
        this.school = school;
        this.stdName = stdName;
        this.phoneFirst = phoneFirst;
        this.phoneMiddle = phoneMiddle;
        this.phoneLast = phoneLast;
    }

}
