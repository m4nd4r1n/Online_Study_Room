package com.edu.opensky.domain;

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
    @Column(length = 15)
    private String prtId;

    @Column(nullable = true, length=15)
    private String mteId;

    @Builder
    public Parent(String prtId, String mteId){
        this.prtId = prtId;
        this.mteId = mteId;

    }

    public void update(String prtId, String mteId){
        this.prtId = prtId;
        this.mteId = mteId;
    }
}
