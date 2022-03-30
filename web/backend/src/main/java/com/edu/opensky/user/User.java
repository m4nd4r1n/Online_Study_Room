package com.edu.opensky.user;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
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

    public void setLastAccessDate(LocalDate lastAccessDate) {
        this.lastAccessDate = lastAccessDate;
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
