package com.edu.opensky.user.mentor;

import com.edu.opensky.user.mentee.Mentee;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Mentor {
    @Id
    private String mtrId;

    @Column
    private String name;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "mtrId")
    private List<Mentee> menteeList = new ArrayList<>();

    @Builder
    public Mentor(String mtrId, String name){
        this.mtrId = mtrId;
        this.name = name;
    }
}
