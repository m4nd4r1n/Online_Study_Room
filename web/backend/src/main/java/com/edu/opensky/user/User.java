package com.edu.opensky.user;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String email;

    private String password;

    private String role;

    private LocalDate lastAccessDate;

    private String name;

    private String phone;

    private LocalDate birth;


    @Builder
    public User(String email, String password,String role, LocalDate lastAccessDate, String name, String phone, LocalDate birth){
        this.email = email;
        this.password = password;
        this.role = role;
        this.lastAccessDate = lastAccessDate;
        this.phone = phone;
        this.name = name;
        this.birth = birth;

    }

    public void setLastAccessDate(LocalDate lastAccessDate) {
        this.lastAccessDate = lastAccessDate;
    }


    @Builder
    public void update(String email, String password, String role, String name, String phone, LocalDate birth){
        this.email = email;
        this.password = password;
        this.role = role;
        this.lastAccessDate = LocalDate.now();
        this.phone = phone;
        this.name = name;
        this.birth = birth;

    }
}
