package com.edu.opensky.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long achievementId;

    private String stdId;
    private String name;
    private Long experience;

    @Builder
    public Achievement(String stdId, String name, Long experience){
        this.stdId = stdId;
        this.name = name;
        this.experience = experience;

    }
}
