package com.edu.opensky.user.mentee;

import com.edu.opensky.achievement.Achievement;
import com.edu.opensky.attendance.Attendance;
import com.edu.opensky.planner.Planner;
import com.edu.opensky.user.User;
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
public class Mentee {

    @Id
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

    @JsonManagedReference
    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
    private List<Attendance> attendanceList = new ArrayList<>();;

    @JsonManagedReference
    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
    private List<Achievement> achievementList = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
    private List<Planner> PlannerList = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "email")
    private User user;

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
