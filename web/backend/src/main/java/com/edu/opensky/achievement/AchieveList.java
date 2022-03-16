package com.edu.opensky.achievement;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class AchieveList {

    @Id
    private Long id;

    @Column(unique = true)
    private String title;
    private Long experience;

    @Builder
    public AchieveList(Long id, String title, Long experience){
        this.id = id;
        this.title = title;
        this.experience = experience;

    }


}
