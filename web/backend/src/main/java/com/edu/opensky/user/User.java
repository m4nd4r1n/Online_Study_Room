package com.edu.opensky.user;

import com.edu.opensky.user.mentee.Mentee;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id
    private String email;

    private String password;

    private LocalDate lastAccessDate;

    private String name;

    private String phone;

    private LocalDate birth;


    @Builder
    public User(String email, String password,LocalDate lastAccessDate, String name, String phone, LocalDate birth){
        this.email = email;
        this.password = password;
        this.lastAccessDate = lastAccessDate;
        this.phone = phone;
        this.name = name;
        this.birth = birth;

    }





    public void update(String email, String password, String name, String phone, LocalDate birth){
        this.email = email;
        this.password = password;
        this.lastAccessDate = LocalDate.now();
        this.phone = phone;
        this.name = name;
        this.birth = birth;

    }
}
