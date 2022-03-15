package com.edu.opensky.user.mentor;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Mentor {
    @Id
    @Column(name = "mentor_id", length = 15)
    private String mtrId;

    @Column(name = "fk_mentee_id", nullable = true, length=15)
    private String mteId;

    @Builder
    public Mentor(String mtrId, String mteId){
        this.mtrId = mtrId;
        this.mteId = mteId;
    }

}
