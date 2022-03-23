package com.edu.opensky.achievement;

import com.edu.opensky.user.mentee.Mentee;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long achievementId;


    private String name;
    private Long experience;
    private LocalDate date;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mte_id")
    private Mentee mentee;

    @Builder
    public Achievement(Long achievementId, Mentee mentee, String name, Long experience){
        this.achievementId = achievementId;
        this.mentee = mentee;
        this.name = name;
        this.experience = experience;
        this.date = LocalDate.now();

    }
}
