package com.edu.opensky.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
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




    @Builder
    public User(String email, String password,LocalDate lastAccessDate){
        this.email = email;
        this.password = password;
        this.lastAccessDate = lastAccessDate;

    }





    public void update(String username, String password){
        this.email = username;
        this.password = password;
    }
}
