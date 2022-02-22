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
public class Mentee {

    @Id
    @Column(length = 15)
    private String mteId;

    @Column(nullable = true, length=15)
    private String mtrId;

    @Column(nullable = true, length=15)
    private String prtId;

    @Column(nullable = true, length=15)
    private String school;

    @Column(columnDefinition = "integer default 1")
    private Integer level;

    @Column(columnDefinition = "integer default 0")
    private Integer exp;

    @Builder
    public Mentee(String mtrId, String mteId, String prtId, String school){
        this.mtrId = mtrId;
        this.mteId = mteId;
        this.prtId = prtId;
        this.school = school;
        this.level = 1;
        this.exp = 0;
    }
}
