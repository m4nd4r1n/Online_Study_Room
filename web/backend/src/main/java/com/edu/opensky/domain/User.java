package com.edu.opensky.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id
    private String regnum;

    private String email;
    private String password;
    private String name;
    private String phone;
    private char sex;
    private String location;


    @Builder
    public User(String regnum, String email, String password, String name, String phone, char sex , String location){
        this.regnum = regnum;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.sex= sex;
        this.location = location;

    }

    public void update(String username, String password){
        this.email = username;
        this.password = password;
    }
}
