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
    private String email;

    private String password;




    @Builder
    public User(String email, String password){
        this.email = email;
        this.password = password;

    }

    public void update(String username, String password){
        this.email = username;
        this.password = password;
    }
}
