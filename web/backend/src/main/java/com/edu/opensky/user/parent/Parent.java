package com.edu.opensky.user.parent;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Parent {
    @Id
    private String prtId;

    @Column
    private String name;

    @Column(nullable = true)
    private String stdName;

    @Column(nullable = true)
    private String stdPhone;

    @Builder
    public Parent(String prtId,String name, String stdName, String stdPhone){
        this.prtId = prtId;
        this.name = name;
        this.stdName = stdName;
        this.stdPhone = stdPhone;

    }

    public void update(String prtId,String name, String stdName, String stdPhone){
        this.prtId = prtId;
        this.name = name;
        this.stdName = stdName;
        this.stdPhone = stdPhone;
    }
}
