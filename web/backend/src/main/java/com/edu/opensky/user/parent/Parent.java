package com.edu.opensky.user.parent;

import com.edu.opensky.user.mentee.Mentee;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Parent {
    @Id
    private String prtId;

    @Column
    private String name;

    @Column(nullable = false)
    private String stdName;

    @Column(nullable = false)
    private String stdPhone;

    @OneToOne
    @JoinColumn(name = "mteId")
    private Mentee mentee;

    @Builder
    public Parent(String prtId,String name, String stdName, String stdPhone, Mentee mentee){
        this.prtId = prtId;
        this.name = name;
        this.stdName = stdName;
        this.stdPhone = stdPhone;
        this.mentee = mentee;

    }

}
