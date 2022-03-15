package com.edu.opensky.achievement;

import com.edu.opensky.user.mentee.Mentee;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long achievementId;

    @ManyToOne
    @JoinColumn(name = "mte_id")
    private Mentee mentee;
    private String name;
    private Long experience;

    @Builder
    public Achievement(Mentee mentee, String name, Long experience){
        this.mentee = mentee;
        this.name = name;
        this.experience = experience;

    }
}
